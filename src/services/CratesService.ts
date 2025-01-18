import axios from "axios"
import {
    filterItems,
    generateOptions,
    getCurrentLocale,
    tLocal
} from "../utils"

export default class CratesService {
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
                `https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/${locale}/crates.json`
            )
            .then((res) => res.data)

        const filterList = [
            {
                prop: "contains",
                name: tLocal("filter_contains"),
                type: "multi-select",
                options: generateOptions(items, {
                    type: "fromNestedProperty",
                    property: "contains"
                })
            },
            {
                prop: "contains_rare",
                name: tLocal("filter_contains_rare"),
                type: "multi-select",
                options: generateOptions(items, {
                    type: "fromNestedProperty",
                    property: "contains_rare"
                })
            },
            {
                prop: "type",
                name: tLocal("filter_type"),
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
