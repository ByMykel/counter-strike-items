import axios from "axios"
import sha1 from "sha1"

// const PROXY = "https://corsproxy.io/?"
// const BASE_URL = PROXY + "https://prices.csgotrader.app/latest/prices_v6.json"
const BASE_URL =
    "https://raw.githubusercontent.com/ByMykel/counter-strike-price-tracker/main/static/prices/latest.json"

export default class PriceService {
    async fetchPrices() {
        const response = await axios.get(BASE_URL)

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
}
