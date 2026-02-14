import { cachedGet } from "../utils/apiCache"
import { filterItems, generateOptions } from "../utils"

export default class CollectiblesService {
    async query({
        search,
        filters
    }: {
        search: string
        filters: { [prop: string]: string[] }
    }) {
        let items = await cachedGet<any[]>(
            `https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/collectibles.json`
        )

        const filterList = [
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
                prop: "type",
                name: "Type",
                type: "multi-select",
                options: [
                    ...generateOptions(items, {
                        type: "fromProperty",
                        property: "type"
                    }),
                    {
                        id: "null",
                        name: "Other"
                    }
                ]
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

        return {
            items: filterItems(items, search, filters),
            filters: filterList
        }
    }
}
