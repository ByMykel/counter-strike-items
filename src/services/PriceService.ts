import axios from "axios"
import * as cheerio from "cheerio"
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
        const url = `https://corsproxy.io/?url=https://steamcommunity.com/market/listings/730/${encodeURI(marketHashName)}`
        let html: string
        try {
            const response = await axios.get(url)
            html = response.data
        } catch (error) {
            return []
        }
        const $ = cheerio.load(html)
        const scripts = $("script").get()
        const lines =
            (scripts[scripts.length - 1]?.children[0] as any)?.data?.split(
                ";"
            ) ?? []

        const prices = lines.find((line: string) => line.includes("var line1="))

        if (prices == null) {
            return []
        }

        const priceData = prices.substring(prices.indexOf("var line1=") + 10)
        return JSON.parse(priceData)
            .map(([time, value, volume]: string[]) => ({
                time: Date.parse(time),
                value,
                volume: parseInt(volume)
            }))
            .slice(-50)
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
