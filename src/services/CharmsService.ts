import { cachedGet } from "../utils/apiCache"
import { filterItems, generateOptions } from "../utils"

export default class CharmsService {
    async query({
        search,
        filters
    }: {
        search: string
        filters: { [prop: string]: string[] }
    }) {
        let items = await cachedGet<any[]>(
            `https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/keychains.json`
        )

        const filterList = [
            {
                prop: "price_range",
                name: "Price",
                type: "price-range",
                options: []
            },
            {
                prop: "rarity",
                name: "Rarity",
                type: "multi-select",
                options: generateOptions(items, {
                    type: "fromNestedSingleProperty",
                    property: "rarity"
                })
            },
            {
                prop: "collections",
                name: "Collections",
                type: "multi-select",
                options: generateOptions(items, {
                    type: "fromNestedProperty",
                    property: "collections"
                })
            }
        ]

        return {
            items: filterItems(items, search, filters),
            filters: filterList
        }
    }
}
