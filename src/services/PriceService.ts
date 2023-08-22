import axios from "axios";

const PROXY = "https://corsproxy.io/?"
const BASE_URL = PROXY + "https://prices.csgotrader.app/latest/prices_v6.json"

export default class BaseService {
    async fetchPrices() {
        const response = await axios.get(BASE_URL);

        return response.data;
    }
}
