import { ref } from "vue"
import { defineStore } from "pinia"

import { ItemDetail } from "../types/index"
import HomeService from "../services/HomeService"
import PriceService from "../services/PriceService"
import { usePricesStore } from "./prices"
import { getCurrentCurrency } from "../utils"

export const useItemDetailStore = defineStore("item-detail", () => {
    const priceService = new PriceService()
    const { convertCurrency } = usePricesStore()

    const items = ref<{ [key: string]: any }>({})
    const selected = ref<ItemDetail>()

    async function getItemDetails(id: string) {
        if (!Object.keys(items.value).length) return

        const item = items.value[id]
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
            style: item?.style ?? null
        }

        if (selected.value.market_hash_name) {
            const prices = await priceService.fetchItemPrice(
                selected.value.market_hash_name
            )
            const currency = getCurrentCurrency()
            selected.value.price_history = prices.map((item) => ({
                ...item,
                value: convertCurrency(item.value, "USD", currency)
            }))
        }
    }

    function deleteItem() {
        selected.value = undefined
    }

    new HomeService().getAllItems().then((newItems) => (items.value = newItems))

    return {
        items,
        selected,

        getItemDetails,
        deleteItem
    }
})
