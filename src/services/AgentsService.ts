import { cachedGet } from "../utils/apiCache"
import { filterItems, generateOptions } from "../utils"

export default class AgentsService {
    async query({
        search,
        filters
    }: {
        search: string
        filters: { [prop: string]: string[] }
    }) {
        let items = await cachedGet<any[]>(
            `https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/agents.json`
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
                prop: "team",
                name: "Team",
                type: "multi-select",
                options: generateOptions(items, {
                    type: "fromNestedSingleProperty",
                    property: "team"
                })
            }
        ]

        return {
            items: filterItems(items, search, filters),
            filters: filterList
        }
    }
}
