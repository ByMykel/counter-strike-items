import { cachedGet } from "../utils/apiCache"
import { filterItems, generateOptions } from "../utils"

export default class CollectionsService {
    async query({
        search,
        filters
    }: {
        search: string
        filters: { [prop: string]: string[] }
    }) {
        let items = await cachedGet<any[]>(
            `https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/collections.json`
        )

        const filterList = [
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
                prop: "contains",
                name: "Contains",
                type: "multi-select",
                options: generateOptions(items, {
                    type: "fromNestedProperty",
                    property: "contains"
                })
            }
        ]

        return {
            items: filterItems(items, search, filters),
            filters: filterList
        }
    }
}
