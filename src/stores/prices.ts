import { ref } from "vue"
import { defineStore } from "pinia"

import PriceService from "../services/PriceService"

export const usePricesStore = defineStore("prices", () => {
    const priceService = new PriceService()

    const prices = ref<any>({})

    async function fetchPrices() {
        try {
            prices.value = await priceService.fetchPrices()
        } catch {
            console.error("Unable to load prices")
        }
    }

    function getPrice(marketHashName: string) {
        return prices.value[marketHashName]
    }

    function getItemSteamPrice(marketHashName: string) {
        const prices = getPrice(marketHashName)

        return (
            (
                prices?.steam.last_7d ||
                prices?.steam.last_24h ||
                prices?.steam.last_30d ||
                prices?.steam.last_90d ||
                null
            )?.toFixed(2) ?? null
        )
    }

    return { prices, fetchPrices, getPrice, getItemSteamPrice }
})
