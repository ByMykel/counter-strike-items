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
                `https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/${locale}/graffiti.json`
            )
            .then((res) => res.data)

        const filterList = [
            {
                prop: "rarity",
                name: tLocal("filter_rarity"),
                type: "multi-select",
                options: generateOptions(items, {
                    type: "fromNestedSingleProperty",
                    property: "rarity"
                })
            },
            {
                prop: "crates",
                name: tLocal("filter_crate"),
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
