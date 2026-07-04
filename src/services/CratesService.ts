import { cachedGet } from "../utils/apiCache"
import { filterItems, generateOptionsBatch } from "../utils"
import { getOrBuild, BuiltCategory } from "../utils/processedCache"

async function build(): Promise<BuiltCategory> {
    const items = await cachedGet<any[]>(
        `https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/crates.json`
    )

    const [contains, containsRare, type] = generateOptionsBatch(items, [
        { type: "fromNestedProperty", property: "contains" },
        { type: "fromNestedProperty", property: "contains_rare" },
        { type: "fromProperty", property: "type" }
    ])

    return {
        items,
        filters: [
            { prop: "price_range", name: "Price", type: "price-range", options: [] },
            { prop: "contains", name: "Contains", type: "multi-select", options: contains },
            { prop: "contains_rare", name: "Contains special", type: "multi-select", options: containsRare },
            { prop: "type", name: "Type", type: "multi-select", options: type }
        ]
    }
}

export default class CratesService {
    async query({
        search,
        filters
    }: {
        search: string
        filters: { [prop: string]: string[] }
    }) {
        const built = await getOrBuild("crates", build)
        return {
            items: filterItems(built.items, search, filters),
            filters: built.filters
        }
    }
}
