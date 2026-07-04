import { cachedGet } from "../utils/apiCache"
import { filterItems, generateOptionsBatch } from "../utils"
import { getOrBuild, BuiltCategory } from "../utils/processedCache"
import { CSItem } from "../types"

async function build(): Promise<BuiltCategory> {
    const items = await cachedGet<CSItem[]>(
        `https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/collectibles.json`
    )

    const [rarity, type] = generateOptionsBatch(items, [
        { type: "fromNestedSingleProperty", property: "rarity" },
        { type: "fromProperty", property: "type" }
    ])

    return {
        items,
        filters: [
            {
                prop: "rarity",
                name: "Rarity",
                type: "multi-select",
                options: rarity
            },
            {
                prop: "type",
                name: "Type",
                type: "multi-select",
                options: [...type, { id: "null", name: "Other" }]
            },
            {
                prop: "genuine",
                name: "Genuine",
                type: "multi-select",
                options: [
                    { id: "true", name: "Yes" },
                    { id: "false", name: "No" }
                ]
            }
        ]
    }
}

export default class CollectiblesService {
    async query({
        search,
        filters
    }: {
        search: string
        filters: { [prop: string]: string[] }
    }) {
        const built = await getOrBuild("collectibles", build)
        return {
            items: filterItems(built.items, search, filters),
            filters: built.filters
        }
    }
}
