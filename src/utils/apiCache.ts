import axios from "axios"

interface CacheEntry {
    data: unknown
    timestamp: number
}

const cache = new Map<string, CacheEntry>()
const TTL = 5 * 60 * 1000 // 5 minutes

export async function cachedGet<T = unknown>(url: string): Promise<T> {
    const entry = cache.get(url)

    if (entry && Date.now() - entry.timestamp < TTL) {
        return structuredClone(entry.data) as T
    }

    const data = await axios.get(url).then((res) => res.data)

    cache.set(url, { data, timestamp: Date.now() })

    return structuredClone(data) as T
}
