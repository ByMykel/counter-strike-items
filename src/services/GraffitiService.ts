import { cachedGet } from "../utils/apiCache"
import { filterItems, generateOptionsBatch } from "../utils"
import { getOrBuild, BuiltCategory } from "../utils/processedCache"
import { CSItem } from "../types"

async function build(): Promise<BuiltCategory> {
    const items = await cachedGet<CSItem[]>(
        `https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/graffiti.json`
    )

    const [rarity, crates] = generateOptionsBatch(items, [
        { type: "fromNestedSingleProperty", property: "rarity" },
        { type: "fromNestedProperty", property: "crates" }
    ])

    return {
        items,
        filters: [
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
                options: rarity
            },
            {
                prop: "crates",
                name: "Crate",
                type: "multi-select",
                options: crates
            }
        ]
    }
}

export default class GraffitiService {
    async query({
        search,
        filters
    }: {
        search: string
        filters: { [prop: string]: string[] }
    }) {
        const built = await getOrBuild("graffiti", build)
        return {
            items: filterItems(built.items, search, filters),
            filters: built.filters
        }
    }
}
