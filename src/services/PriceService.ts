import axios from "axios"
import sha1 from "sha1"
import {
    EXCHANGE_RATES_LAST_FETCHED_STORAGE_KEY,
    EXCHANGE_RATES_STORAGE_KEY
} from "../constants"

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
        const storedData = localStorage.getItem(EXCHANGE_RATES_STORAGE_KEY)
        const lastFetched = localStorage.getItem(
            EXCHANGE_RATES_LAST_FETCHED_STORAGE_KEY
        )
        const today = new Date().toLocaleDateString()

        if (storedData && lastFetched === today) {
            return JSON.parse(storedData)
        }

        const response = await axios.get(
            "https://corsproxy.io/?url=https://prices.csgotrader.app/latest/exchange_rates.json"
        )

        localStorage.setItem(
            EXCHANGE_RATES_STORAGE_KEY,
            JSON.stringify(response.data)
        )
        localStorage.setItem(EXCHANGE_RATES_LAST_FETCHED_STORAGE_KEY, today)

        return response.data
    }
}
