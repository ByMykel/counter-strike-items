import { watchEffect } from "vue"

export function useTitle(title) {
    watchEffect(() => {
        document.title = typeof title === "function" ? title() : title
    })

    return {
        setTitle: (newTitle) => (document.title = newTitle),
        resetTitle: () =>
            (document.title = import.meta.env.VITE_APP_TITLE || "My App")
    }
}
