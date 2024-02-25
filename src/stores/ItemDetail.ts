import { ref } from "vue"
import { defineStore } from "pinia"

import { ItemDetail } from "../types/index"
import HomeService from "../services/HomeService"

export const useItemDetailStore = defineStore("item-detail", () => {
    const items = ref<{ [key: string]: any }>({})
    const selected = ref<ItemDetail>()

    async function getItemDetails(id: string) {
        if (!Object.keys(items.value).length) return

        const item = items.value[id]

        selected.value = {
            id: item.id,
            name: item.name,
            description: item.description,
            crates: item?.crates ?? [],
            collections: item?.collections ?? [],
            contains: item?.contains ?? [],
            containsRare: item?.contains_rare ?? [],
            specialNotes: item?.special_notes ?? [],
            image: item.image
        }
    }

    function deleteItem() {
        selected.value = undefined
    }

    new HomeService().getAllItems().then((newItems) => (items.value = newItems))

    return {
        selected,

        getItemDetails,
        deleteItem
    }
})
