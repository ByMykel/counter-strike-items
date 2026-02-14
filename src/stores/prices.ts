import { ref } from "vue"
import { defineStore } from "pinia"
import axios from "axios"

export const usePriceStore = defineStore("prices", () => {
    const prices = ref<Record<string, number>>({})
    let fetched = false

    async function fetchPrices() {
        if (fetched) return

        fetched = true

        try {
            const { data } = await axios.get(
                "https://raw.githubusercontent.com/ByMykel/counter-strike-price-tracker/refs/heads/main/static/latest.json"
            )

            prices.value = data.prices ?? {}
        } catch (error) {
            console.error("Failed to fetch prices", error)
            fetched = false
        }
    }

    function getPrice(marketHashName: string | undefined): string | null {
        if (!marketHashName) return null

        const cents = prices.value[marketHashName]
        if (cents == null) return null

        return formatPrice(cents)
    }

    function isMarketable(marketHashName: string | undefined): boolean {
        return !!marketHashName
    }

    function formatPrice(cents: number): string {
        const dollars = (cents / 100).toFixed(2)
        return `$${dollars}`
    }

    fetchPrices()

    return {
        prices,
        getPrice,
        formatPrice,
        isMarketable
    }
})
