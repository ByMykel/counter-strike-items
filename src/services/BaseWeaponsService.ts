import axios from "axios"
import { filterItems, getCurrentLocale } from "../utils"

export default class BaseWeaponsService {
    async query({
        search,
        filters
    }: {
        search: string
        filters: { [prop: string]: string[] }
    }) {
        const locale = getCurrentLocale()
        let items = await axios
            .get(
                `https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/${locale}/base_weapons.json`
            )
            .then((res) => res.data)

        return {
            items: filterItems(items, search, filters),
            filters: []
        }
    }
}
