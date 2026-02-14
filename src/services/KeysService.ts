import { cachedGet } from "../utils/apiCache"
import { filterItems, generateOptions } from "../utils"

export default class KeysService {
    async query({
        search,
        filters
    }: {
        search: string
        filters: { [prop: string]: string[] }
    }) {
        let items = await cachedGet<any[]>(
            `https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/keys.json`
        )

        const filterList = [
            {
                prop: "price_range",
                name: "Price",
                type: "price-range",
                options: []
            },
            {
                prop: "crates",
                name: "Crate",
                type: "multi-select",
                options: generateOptions(items, {
                    type: "fromNestedProperty",
                    property: "crates"
                })
            },
            {
                prop: "marketable",
                name: "Marketable",
                type: "multi-select",
                options: [
                    { id: "true", name: "Yes" },
                    { id: "false", name: "No" }
                ]
            }
        ]

        return {
            items: filterItems(items, search, filters),
            filters: filterList
        }
    }
}
