import { onMounted, ref } from "vue"
import { defineStore } from "pinia"

import PriceService from "../services/PriceService"
import { currencySigns } from "../constants/currency"
import { CurrencyCode } from "../types/currency"

export const usePricesStore = defineStore("prices", () => {
    const priceService = new PriceService()

    const prices = ref<any>({})
    const exchangeRates = ref<any>({})

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
            parseFloat(
                (
                    prices?.steam.last_7d ||
                    prices?.steam.last_24h ||
                    prices?.steam.last_30d ||
                    prices?.steam.last_90d ||
                    prices?.steam.last_ever ||
                    null
                )?.toFixed(2)
            ) ?? null
        )
    }

    function getItemSteamPriceInCurrency(
        priceInEuros: number,
        currency: CurrencyCode
    ) {
        if (priceInEuros === null) {
            return null
        }

        if (currency === "EUR") {
            return `${currencySigns["EUR"]} ${parseFloat(priceInEuros.toFixed(2))}`
        }

        const price = convertCurrency(priceInEuros, "EUR", currency)

        if (!price) {
            return null
        }

        return `${currencySigns[currency]} ${price}`
    }

    function convertCurrency(
        amount: number,
        fromCurrency: CurrencyCode,
        toCurrency: CurrencyCode
    ) {
        const fromRate = exchangeRates.value[fromCurrency]
        const toRate = exchangeRates.value[toCurrency]

        if (!fromRate || !toRate) {
            console.error(
                `Invalid currency code. [${fromCurrency} -> ${toCurrency}]`
            )
            return null
        }

        const amountInUSD = amount / fromRate
        const convertedAmount = amountInUSD * toRate

        if (["BTC", "ETH", "FET"].includes(toCurrency)) {
            return parseFloat(convertedAmount.toFixed(10))
        }

        return parseFloat(convertedAmount.toFixed(2))
    }

    onMounted(async () => {
        try {
            exchangeRates.value = await priceService.fetchExchangeRates()
        } catch (error) {
            console.error(error)
        }
    })

    return {
        prices,
        fetchPrices,
        convertCurrency,
        getPrice,
        getItemSteamPrice,
        getItemSteamPriceInCurrency
    }
})
