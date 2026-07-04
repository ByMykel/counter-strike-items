import axios from "axios"

interface CacheEntry {
    data: unknown
    timestamp: number
}

const cache = new Map<string, CacheEntry>()
const TTL = 5 * 60 * 1000 // 5 minutes

// Returns the cached reference directly (no structuredClone). Callers must
// treat the result as immutable / read-only. The one consumer that needs to
// mutate its result (HomeService.getAllItems) copies defensively before doing
// so. Cloning multi-MB payloads on every call was a major source of jank.
export async function cachedGet<T = unknown>(url: string): Promise<T> {
    const entry = cache.get(url)

    if (entry && Date.now() - entry.timestamp < TTL) {
        return entry.data as T
    }

    const data = await axios.get(url).then((res) => res.data)

    cache.set(url, { data, timestamp: Date.now() })

    return data as T
}
