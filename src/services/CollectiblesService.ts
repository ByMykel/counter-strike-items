import axios from "axios"
import {
    filterItems,
    generateOptions,
    getCurrentLocale,
    tLocal
} from "../utils"

export default class StickersService {
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
                `https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/${locale}/collectibles.json`
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
