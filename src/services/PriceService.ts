import axios from "axios"
import sha1 from "sha1"
import {
    STORAGE_KEY_EXCHANGE_RATES,
    STORAGE_KEY_EXCHANGE_RATES_LAST_FETCHED
} from "../constants/currency"

export default class PriceService {
    async fetchPrices() {
        const response = await axios.get(
            "https://raw.githubusercontent.com/ByMykel/counter-strike-price-tracker/main/static/prices/latest.json"
        )

        return response.data
    }

    async fetchItemPrice(
        marketHashName: string
    ): Promise<{ time: number; value: number; volume: number }[]> {
        const endpoint = `https://raw.githubusercontent.com/ByMykel/counter-strike-price-tracker/main/static/pricehistory/${sha1(marketHashName)}.json`

        try {
            const response = await axios.get(endpoint)
            return response.data.splice(-20)
        } catch (error) {
            return []
        }
    }

    async fetchExchangeRates() {
        const storedData = localStorage.getItem(STORAGE_KEY_EXCHANGE_RATES)
        const lastFetched = localStorage.getItem(
            STORAGE_KEY_EXCHANGE_RATES_LAST_FETCHED
        )
        const today = new Date().toLocaleDateString()

        if (storedData && lastFetched === today) {
            return JSON.parse(storedData)
        }

        const response = await axios.get(
            "https://corsproxy.io/?url=https://prices.csgotrader.app/latest/exchange_rates.json"
        )

        localStorage.setItem(
            STORAGE_KEY_EXCHANGE_RATES,
            JSON.stringify(response.data)
        )
        localStorage.setItem(STORAGE_KEY_EXCHANGE_RATES_LAST_FETCHED, today)

        return response.data
    }
}
