import { cachedGet } from "../utils/apiCache"
import { filterItems } from "../utils"

export default class BaseWeaponsService {
    async query({
        search,
        filters
    }: {
        search: string
        filters: { [prop: string]: string[] }
    }) {
        let items = await cachedGet<any[]>(
            `https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/base_weapons.json`
        )

        return {
            items: filterItems(items, search, filters),
            filters: []
        }
    }
}
