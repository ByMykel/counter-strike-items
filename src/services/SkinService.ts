import axios from "axios"
import {
    filterItems,
    generateOptions,
    getCurrentLocale,
    tLocal
} from "../utils"

export default class SkinService {
    async query({
        search,
        filters
    }: {
        search: string
        filters: { [prop: string]: string[] }
    }) {
        const locale = getCurrentLocale()
        let skins = await axios
            .get(
                `https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/${locale}/skins.json`
            )
            .then((res: any) =>
                res.data.reduce((acc: any, item: any) => {
                    acc[item.id] = item
                    return acc
                }, {})
            )

        let items = await axios
            .get(
                `https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/${locale}/skins_not_grouped.json`
            )
            .then((res: any) =>
                res.data.map((item: any) => {
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
            )

        const filterList = [
            {
                prop: "crates",
                name: tLocal("filter_crates"),
                type: "multi-select",
                options: generateOptions(items, {
                    type: "fromNestedProperty",
                    property: "crates"
                })
            },
            {
                prop: "collections",
                name: tLocal("filter_collections"),
                type: "multi-select",
                options: generateOptions(items, {
                    type: "fromNestedProperty",
                    property: "collections"
                })
            },
            {
                prop: "rarity",
                name: tLocal("filter_rarity"),
                type: "multi-select",
                options: generateOptions(items, {
                    type: "fromNestedSingleProperty",
                    property: "rarity"
                })
            },
            {
                prop: "pattern",
                name: tLocal("filter_pattern"),
                type: "multi-select",
                options: generateOptions(items, {
                    type: "fromNestedSingleProperty",
                    property: "pattern"
                })
            },
            {
                prop: "style",
                name: tLocal("filter_finish_style"),
                type: "multi-select",
                options: generateOptions(items, {
                    type: "fromNestedSingleProperty",
                    property: "style"
                })
            },
            {
                prop: "weapon",
                name: tLocal("filter_weapon"),
                type: "multi-select",
                options: generateOptions(items, {
                    type: "fromNestedSingleProperty",
                    property: "weapon"
                })
            },
            {
                prop: "wear",
                name: tLocal("filter_wear"),
                type: "multi-select",
                options: generateOptions(items, {
                    type: "fromNestedSingleProperty",
                    property: "wear"
                })
            },
            {
                prop: "category",
                name: tLocal("filter_category"),
                type: "multi-select",
                options: generateOptions(items, {
                    type: "fromNestedSingleProperty",
                    property: "category"
                })
            },
            {
                prop: "paint_index",
                name: tLocal("filter_paint_index"),
                type: "multi-select",
                options: generateOptions(items, {
                    type: "fromProperty",
                    property: "paint_index"
                })
            },
            {
                prop: "souvenir",
                name: tLocal("filter_souvenir"),
                type: "multi-select",
                options: [
                    { id: "true", name: tLocal("common_yes") },
                    { id: "false", name: tLocal("common_no") }
                ]
            },
            {
                prop: "phase",
                name: tLocal("filter_phase"),
                type: "multi-select",
                options: generateOptions(items, {
                    type: "fromProperty",
                    property: "phase"
                })
            },
            {
                prop: "stattrak",
                name: tLocal("filter_stattrak"),
                type: "multi-select",
                options: [
                    { id: "true", name: tLocal("common_yes") },
                    { id: "false", name: tLocal("common_no") }
                ]
            },
            {
                prop: "team",
                name: tLocal("filter_team"),
                type: "multi-select",
                options: generateOptions(items, {
                    type: "fromNestedSingleProperty",
                    property: "team"
                })
            },
            {
                prop: "legacy_model",
                name: tLocal("filter_legacy_model"),
                type: "multi-select",
                options: [
                    { id: "true", name: tLocal("common_yes") },
                    { id: "false", name: tLocal("common_no") }
                ]
            }
        ]

        return {
            items: filterItems(items, search, filters),
            filters: filterList
        }
    }

    async loadSkins(): Promise<any[]> {
        const locale = getCurrentLocale()
        const response = await axios.get(
            `https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/${locale}/skins.json`
        )
        return response.data
    }
}
