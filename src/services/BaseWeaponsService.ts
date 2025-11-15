import axios from "axios"
import { filterItems } from "../utils"

export default class BaseWeaponsService {
    async query({
        search,
        filters
    }: {
        search: string
        filters: { [prop: string]: string[] }
    }) {
        let items = await axios
            .get(
                `https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/base_weapons.json`
            )
            .then((res) => res.data)

        return {
            items: filterItems(items, search, filters),
            filters: []
        }
    }
}
