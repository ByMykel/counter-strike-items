import { watchEffect, ComputedRef } from "vue"

export function useTitle(title: string | ComputedRef<string>) {
    watchEffect(() => {
        document.title = title instanceof Object ? title.value : title
    })
}
