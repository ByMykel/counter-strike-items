import { cachedGet } from "../utils/apiCache"
import { filterItems, generateOptions } from "../utils"

export default class SkinService {
    async query({
        search,
        filters
    }: {
        search: string
        filters: { [prop: string]: string[] }
    }) {
        const skinsRaw = await cachedGet<any[]>(
            `https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/skins.json`
        )
        let skins = skinsRaw.reduce((acc: any, item: any) => {
            acc[item.id] = item
            return acc
        }, {})

        const itemsRaw = await cachedGet<any[]>(
            `https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/skins_not_grouped.json`
        )
        let items = itemsRaw.map((item: any) => {
            return {
                ...item,
                rare: [
                    "sfui_invpanel_filter_melee",
                    "sfui_invpanel_filter_gloves"
                ].includes(item.category.id),
                collections: skins[item.skin_id]?.collections ?? [],
                crates: skins[item.skin_id]?.crates ?? []
            }
        })

        const filterList = [
            {
                prop: "price_range",
                name: "Price",
                type: "price-range",
                options: []
            },
            {
                prop: "crates",
                name: "Crates",
                type: "multi-select",
                options: generateOptions(items, {
                    type: "fromNestedProperty",
                    property: "crates"
                })
            },
            {
                prop: "collections",
                name: "Collections",
                type: "multi-select",
                options: generateOptions(items, {
                    type: "fromNestedProperty",
                    property: "collections"
                })
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
                prop: "pattern",
                name: "Pattern",
                type: "multi-select",
                options: generateOptions(items, {
                    type: "fromNestedSingleProperty",
                    property: "pattern"
                })
            },
            {
                prop: "style",
                name: "Finish Style",
                type: "multi-select",
                options: generateOptions(items, {
                    type: "fromNestedSingleProperty",
                    property: "style"
                })
            },
            {
                prop: "weapon",
                name: "Weapon",
                type: "multi-select",
                options: generateOptions(items, {
                    type: "fromNestedSingleProperty",
                    property: "weapon"
                })
            },
            {
                prop: "wear",
                name: "Wear",
                type: "multi-select",
                options: generateOptions(items, {
                    type: "fromNestedSingleProperty",
                    property: "wear"
                })
            },
            {
                prop: "category",
                name: "Category",
                type: "multi-select",
                options: generateOptions(items, {
                    type: "fromNestedSingleProperty",
                    property: "category"
                })
            },
            {
                prop: "paint_index",
                name: "Paint index",
                type: "multi-select",
                options: generateOptions(items, {
                    type: "fromProperty",
                    property: "paint_index"
                })
            },
            {
                prop: "souvenir",
                name: "Souvenir",
                type: "multi-select",
                options: [
                    { id: "true", name: "Yes" },
                    { id: "false", name: "No" }
                ]
            },
            {
                prop: "phase",
                name: "Phase",
                type: "multi-select",
                options: generateOptions(items, {
                    type: "fromProperty",
                    property: "phase"
                })
            },
            {
                prop: "stattrak",
                name: "StatTrak™",
                type: "multi-select",
                options: [
                    { id: "true", name: "Yes" },
                    { id: "false", name: "No" }
                ]
            },
            {
                prop: "team",
                name: "Team",
                type: "multi-select",
                options: generateOptions(items, {
                    type: "fromNestedSingleProperty",
                    property: "team"
                })
            },
            {
                prop: "legacy_model",
                name: "Legacy model",
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

    async loadSkins(): Promise<any[]> {
        return cachedGet<any[]>(
            `https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/skins.json`
        )
    }
}
