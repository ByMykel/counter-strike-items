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

    return { prices, fetchPrices, getPrice }
})
