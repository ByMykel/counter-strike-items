import { ref } from "vue"
import { defineStore } from "pinia"

import { ItemDetail } from "../types/index"
import Cs2Service from "../services/Cs2Service"

export const useAllItemsStore = defineStore("all-items", () => {
    const ItemsService = new Cs2Service()
    const items = ref<ItemDetail[]>([])
    const total = ref()
    const loading = ref(false)
    const nextPage = ref<string>()

    async function fetchItems(query: string) {
        loading.value = true

        try {
            const data = await ItemsService.getItems(query)
            items.value = data.data
            nextPage.value = data.page.next
            total.value = data.total
        } catch (error) {
            console.error(error)
        } finally {
            loading.value = false
        }
    }

    async function loadMore() {
        if (nextPage.value == null) return

        loading.value = true

        try {
            const data = await ItemsService.getNext(nextPage.value)
            items.value.push(...data.data)
            nextPage.value = data.page.next
        } catch (error) {
            console.error(error)
        } finally {
            loading.value = false
        }
    }

    return { items, loading, total, fetchItems, loadMore }
})
