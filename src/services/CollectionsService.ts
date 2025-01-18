import axios from "axios"
import {
    filterItems,
    generateOptions,
    getCurrentLocale,
    tLocal
} from "../utils"

export default class CollectionsService {
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
                `https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/${locale}/collections.json`
            )
            .then((res) => res.data)

        const filterList = [
            {
                prop: "crates",
                name: tLocal("filter_crate"),
                type: "multi-select",
                options: generateOptions(items, {
                    type: "fromNestedProperty",
                    property: "crates"
                })
            },
            {
                prop: "contains",
                name: tLocal("filter_contains"),
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
