import { ref, watch } from "vue"
import { defineStore } from "pinia"
import { useRoute, useRouter } from "vue-router"

import { ItemDetail } from "../types/index"
import HomeService from "../services/HomeService"

export const useItemDetailStore = defineStore("item-detail", () => {
    const homeService = new HomeService()
    const route = useRoute()
    const router = useRouter()

    const items = ref<{ [key: string]: any }>({})
    const selected = ref<ItemDetail>()
    const history = ref<string[]>([])

    async function getItemDetails(
        id: string,
        skipHistory = false,
        skipUrlUpdate = false
    ) {
        if (!Object.keys(items.value).length) return

        const currentSelectedId = selected.value?.id

        const item = items.value[id]

        if (!item) {
            console.warn(`Item with id "${id}" not found`)
            return
        }

        if (currentSelectedId && !skipHistory && currentSelectedId !== id) {
            const lastIndex = history.value.length - 1
            const isDifferentFromLast =
                lastIndex < 0 || history.value[lastIndex] !== currentSelectedId

            if (isDifferentFromLast) {
                history.value.push(currentSelectedId)
            }
        }

        let variants: {
            id: string
            name: string
            image: string
        }[] = []

        if (id.includes("graffiti") && id.split("_")?.length > 1) {
            variants = Object.entries(items.value)
                .filter(([key]) => key.startsWith(id.split("_")[0]))
                .map(([, value]) => ({
                    id: value.id,
                    name: value.name,
                    image: value.image
                }))
        }

        selected.value = {
            id: item.id,
            name: item.name,
            description: (item.description ?? " ")
                .replaceAll("\\n", "")
                .replaceAll('\\"', '"'),
            crates: item?.crates ?? [],
            collections: item?.collections ?? [],
            contains: item?.contains ?? [],
            containsRare: item?.contains_rare ?? [],
            specialNotes: item?.special_notes ?? [],
            wears: item?.wears ?? [],
            image: item.image,
            skin_stattrak: item.skin_stattrak ?? false,
            skin_souvenir: item.skin_souvenir ?? false,
            market_hash_name: item?.market_hash_name ?? "",
            price_history: [],
            variants,
            related_collectibles: item?.related_collectibles ?? [],
            style: item?.style ?? null,
            image_inventory: item?.original?.image_inventory ?? ""
        }

        if (!skipUrlUpdate) {
            router.replace({
                query: { ...route.query, itemId: id }
            })
        }
    }

    function goBack() {
        if (history.value.length > 0) {
            const previousId = history.value.pop()
            if (previousId) {
                getItemDetails(previousId, true)
            }
        }
    }

    function deleteItem() {
        selected.value = undefined
        history.value = []

        const { itemId, ...restQuery } = route.query
        router.replace({ query: restQuery })
    }

    homeService.getAllItems().then((newItems) => {
        items.value = newItems

        const itemId = route.query.itemId
        if (typeof itemId === "string" && itemId) {
            getItemDetails(itemId, true, true)
        }
    })

    watch(
        () => route.query.itemId,
        (itemId) => {
            if (
                typeof itemId === "string" &&
                itemId &&
                itemId !== selected.value?.id
            ) {
                getItemDetails(itemId, true, true)
            }
        }
    )

    return {
        items,
        selected,
        history,

        getItemDetails,
        goBack,
        deleteItem
    }
})
