import { cachedGet } from "../utils/apiCache"
import { filterItems, generateOptions } from "../utils"

export default class CratesService {
    async query({
        search,
        filters
    }: {
        search: string
        filters: { [prop: string]: string[] }
    }) {
        let items = await cachedGet<any[]>(
            `https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/crates.json`
        )

        const filterList = [
            {
                prop: "price_range",
                name: "Price",
                type: "price-range",
                options: []
            },
            {
                prop: "contains",
                name: "Contains",
                type: "multi-select",
                options: generateOptions(items, {
                    type: "fromNestedProperty",
                    property: "contains"
                })
            },
            {
                prop: "contains_rare",
                name: "Contains special",
                type: "multi-select",
                options: generateOptions(items, {
                    type: "fromNestedProperty",
                    property: "contains_rare"
                })
            },
            {
                prop: "type",
                name: "Type",
                type: "multi-select",
                options: generateOptions(items, {
                    type: "fromProperty",
                    property: "type"
                })
            }
        ]

        return {
            items: filterItems(items, search, filters),
            filters: filterList
        }
    }
}
