import axios from "axios"
import { getManifestId } from "./manifestId"

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

    // version param busts the service-worker cache when data/images change
    const version = getManifestId()
    const fetchUrl = version ? `${url}?v=${version}` : url
    const data = await axios.get(fetchUrl).then((res) => res.data)

    cache.set(url, { data, timestamp: Date.now() })

    return data as T
}

export function clearApiCache() {
    cache.clear()
}
