// Standalone so apiCache can read the version without importing manifestGuard.
const STORAGE_KEY = "csgo-manifest-id"

let manifestId = localStorage.getItem(STORAGE_KEY) ?? ""

export function getManifestId(): string {
    return manifestId
}

export function setManifestId(value: string) {
    manifestId = value
    localStorage.setItem(STORAGE_KEY, value)
}
