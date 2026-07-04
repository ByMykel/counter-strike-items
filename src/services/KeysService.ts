import { cachedGet } from "../utils/apiCache"
import { filterItems, generateOptionsBatch } from "../utils"
import { getOrBuild, BuiltCategory } from "../utils/processedCache"

async function build(): Promise<BuiltCategory> {
    const items = await cachedGet<any[]>(
        `https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/keys.json`
    )

    const [crates] = generateOptionsBatch(items, [
        { type: "fromNestedProperty", property: "crates" }
    ])

    return {
        items,
        filters: [
            { prop: "price_range", name: "Price", type: "price-range", options: [] },
            { prop: "crates", name: "Crate", type: "multi-select", options: crates },
            {
                prop: "marketable",
                name: "Marketable",
                type: "multi-select",
                options: [
                    { id: "true", name: "Yes" },
                    { id: "false", name: "No" }
                ]
            }
        ]
    }
}

export default class KeysService {
    async query({
        search,
        filters
    }: {
        search: string
        filters: { [prop: string]: string[] }
    }) {
        const built = await getOrBuild("keys", build)
        return {
            items: filterItems(built.items, search, filters),
            filters: built.filters
        }
    }
}
