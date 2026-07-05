import { clearApiCache } from "./apiCache"
import { clearProcessedCache } from "./processedCache"
import { getManifestId, setManifestId } from "./manifestId"

const MARKER_URLS = [
    "https://raw.githubusercontent.com/ByMykel/CSGO-API/refs/heads/main/manifestIdUpdate.txt",
    "https://raw.githubusercontent.com/ByMykel/CSGO-API/refs/heads/main/imagesShaUpdate.txt"
]

async function fetchMarker(url: string): Promise<string | null> {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 3000)
    try {
        const res = await fetch(`${url}?t=${Date.now()}`, {
            cache: "no-store",
            signal: controller.signal
        })
        if (!res.ok) return null
        return (await res.text()).trim()
    } catch {
        return null
    } finally {
        clearTimeout(timeout)
    }
}

// Returns true when either marker changed (caches were wiped). On any network
// failure keeps serving cache and returns false.
export async function checkManifest(): Promise<boolean> {
    const markers = await Promise.all(MARKER_URLS.map(fetchMarker))
    if (markers.some((m) => !m)) return false

    const remote = markers.join("-")
    if (remote === getManifestId()) return false

    clearApiCache()
    clearProcessedCache()
    setManifestId(remote)
    return true
}
