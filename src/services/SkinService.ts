import axios from "axios"
import { filterItems, generateOptions } from "../utils"

export default class SkinService {
    async query({
        search,
        filters
    }: {
        search: string
        filters: { [prop: string]: string[] }
    }) {
        let items = await axios
            .get(
                "https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/skins_not_grouped.json"
            )
            .then((res) =>
                res.data.map((item: any) => {
                    return {
                        ...item,
                        rare: [
                            "sfui_invpanel_filter_melee",
                            "sfui_invpanel_filter_gloves"
                        ].includes(item.category.id)
                    }
                })
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
                prop: "pattern",
                name: "Pattern",
                type: "multi-select",
                options: generateOptions(items, {
                    type: "fromNestedSingleProperty",
                    property: "pattern"
                })
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
                prop: "stattrak",
                name: "StatTrak™",
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
