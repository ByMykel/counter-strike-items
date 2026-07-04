import { cachedGet } from "../utils/apiCache"
import { filterItems, generateOptionsBatch } from "../utils"
import { getOrBuild, BuiltCategory } from "../utils/processedCache"
import { CSItem } from "../types"

async function build(): Promise<BuiltCategory> {
    const items = await cachedGet<CSItem[]>(
        `https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/agents.json`
    )

    const [rarity, team] = generateOptionsBatch(items, [
        { type: "fromNestedSingleProperty", property: "rarity" },
        { type: "fromNestedSingleProperty", property: "team" }
    ])

    return {
        items,
        filters: [
            { prop: "price_range", name: "Price", type: "price-range", options: [] },
            { prop: "rarity", name: "Rarity", type: "multi-select", options: rarity },
            { prop: "team", name: "Team", type: "multi-select", options: team }
        ]
    }
}

export default class AgentsService {
    async query({
        search,
        filters
    }: {
        search: string
        filters: { [prop: string]: string[] }
    }) {
        const built = await getOrBuild("agents", build)
        return {
            items: filterItems(built.items, search, filters),
            filters: built.filters
        }
    }
}
