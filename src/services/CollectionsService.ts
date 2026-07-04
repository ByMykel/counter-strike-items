import { cachedGet } from "../utils/apiCache"
import { filterItems, generateOptionsBatch } from "../utils"
import { getOrBuild, BuiltCategory } from "../utils/processedCache"
import { CSItem } from "../types"

async function build(): Promise<BuiltCategory> {
    const items = await cachedGet<CSItem[]>(
        `https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/collections.json`
    )

    const [crates, contains] = generateOptionsBatch(items, [
        { type: "fromNestedProperty", property: "crates" },
        { type: "fromNestedProperty", property: "contains" }
    ])

    return {
        items,
        filters: [
            {
                prop: "crates",
                name: "Crate",
                type: "multi-select",
                options: crates
            },
            {
                prop: "contains",
                name: "Contains",
                type: "multi-select",
                options: contains
            }
        ]
    }
}

export default class CollectionsService {
    async query({
        search,
        filters
    }: {
        search: string
        filters: { [prop: string]: string[] }
    }) {
        const built = await getOrBuild("collections", build)
        return {
            items: filterItems(built.items, search, filters),
            filters: built.filters
        }
    }
}
