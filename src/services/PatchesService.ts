import { cachedGet } from "../utils/apiCache"
import { filterItems, generateOptionsBatch } from "../utils"
import { getOrBuild, BuiltCategory } from "../utils/processedCache"

async function build(): Promise<BuiltCategory> {
    const items = await cachedGet<any[]>(
        `https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/patches.json`
    )

    const [rarity] = generateOptionsBatch(items, [
        { type: "fromNestedSingleProperty", property: "rarity" }
    ])

    return {
        items,
        filters: [
            { prop: "price_range", name: "Price", type: "price-range", options: [] },
            { prop: "rarity", name: "Rarity", type: "multi-select", options: rarity }
        ]
    }
}

export default class PatchesService {
    async query({
        search,
        filters
    }: {
        search: string
        filters: { [prop: string]: string[] }
    }) {
        const built = await getOrBuild("patches", build)
        return {
            items: filterItems(built.items, search, filters),
            filters: built.filters
        }
    }
}
