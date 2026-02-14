import { cachedGet } from "../utils/apiCache"
import { filterItems, generateOptions } from "../utils"

export default class GraffitiService {
    async query({
        search,
        filters
    }: {
        search: string
        filters: { [prop: string]: string[] }
    }) {
        let items = await cachedGet<any[]>(
            `https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/graffiti.json`
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
                prop: "crates",
                name: "Crate",
                type: "multi-select",
                options: generateOptions(items, {
                    type: "fromNestedProperty",
                    property: "crates"
                })
            }
        ]

        return {
            items: filterItems(items, search, filters),
            filters: filterList
        }
    }
}
