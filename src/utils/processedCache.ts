import { CSItem, Filter } from "../types"

export interface BuiltCategory {
    items: CSItem[]
    filters: Filter[]
}

// Session-lived, in-memory cache of the expensive per-category build
// (fetch + enhance + filter-option generation). Survives in-app navigation
// so switching pages never reprocesses. Cross-reload persistence is handled
// by the service worker caching the raw JSON responses.
const cache = new Map<string, BuiltCategory>()
const inflight = new Map<string, Promise<BuiltCategory>>()

export async function getOrBuild(
    key: string,
    builder: () => Promise<BuiltCategory>
): Promise<BuiltCategory> {
    const cached = cache.get(key)
    if (cached) return cached

    const existing = inflight.get(key)
    if (existing) return existing

    const promise = builder()
        .then((built) => {
            cache.set(key, built)
            inflight.delete(key)
            return built
        })
        .catch((error) => {
            inflight.delete(key)
            throw error
        })

    inflight.set(key, promise)
    return promise
}

export function clearProcessedCache(key?: string) {
    if (key) cache.delete(key)
    else cache.clear()
}
