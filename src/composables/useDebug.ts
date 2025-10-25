import { useLocalStorage } from "@vueuse/core"

const isDebugMode = useLocalStorage("cs-items-debug", false)
let isListenerAdded = false

// Global keyboard shortcut: Ctrl+D to toggle debug mode
const handleKeydown = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === "d") {
        e.preventDefault()
        isDebugMode.value = !isDebugMode.value
        console.log("Debug mode:", isDebugMode.value ? "enabled" : "disabled")
    }
}

// Add event listener only once globally
if (!isListenerAdded) {
    window.addEventListener("keydown", handleKeydown)
    isListenerAdded = true
}

export function useDebug() {
    return {
        isDebugMode
    }
}
