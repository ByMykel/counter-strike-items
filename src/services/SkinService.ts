import { cachedGet } from "../utils/apiCache"
import { filterItems, generateOptionsBatch } from "../utils"
import { getOrBuild, BuiltCategory } from "../utils/processedCache"

async function build(): Promise<BuiltCategory> {
    const skinsRaw = await cachedGet<any[]>(
        `https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/skins.json`
    )
    const skins = skinsRaw.reduce((acc: any, item: any) => {
        acc[item.id] = item
        return acc
    }, {})

    const itemsRaw = await cachedGet<any[]>(
        `https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/skins_not_grouped.json`
    )
    const items = itemsRaw.map((item: any) => {
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

    const [
        crates,
        collections,
        rarity,
        pattern,
        style,
        weapon,
        wear,
        category,
        paintIndex,
        phase,
        team
    ] = generateOptionsBatch(items, [
        { type: "fromNestedProperty", property: "crates" },
        { type: "fromNestedProperty", property: "collections" },
        { type: "fromNestedSingleProperty", property: "rarity" },
        { type: "fromNestedSingleProperty", property: "pattern" },
        { type: "fromNestedSingleProperty", property: "style" },
        { type: "fromNestedSingleProperty", property: "weapon" },
        { type: "fromNestedSingleProperty", property: "wear" },
        { type: "fromNestedSingleProperty", property: "category" },
        { type: "fromProperty", property: "paint_index" },
        { type: "fromProperty", property: "phase" },
        { type: "fromNestedSingleProperty", property: "team" }
    ])

    return {
        items,
        filters: [
            { prop: "price_range", name: "Price", type: "price-range", options: [] },
            { prop: "crates", name: "Crates", type: "multi-select", options: crates },
            { prop: "collections", name: "Collections", type: "multi-select", options: collections },
            { prop: "rarity", name: "Rarity", type: "multi-select", options: rarity },
            { prop: "pattern", name: "Pattern", type: "multi-select", options: pattern },
            { prop: "style", name: "Finish Style", type: "multi-select", options: style },
            { prop: "weapon", name: "Weapon", type: "multi-select", options: weapon },
            { prop: "wear", name: "Wear", type: "multi-select", options: wear },
            { prop: "category", name: "Category", type: "multi-select", options: category },
            { prop: "paint_index", name: "Paint index", type: "multi-select", options: paintIndex },
            {
                prop: "souvenir",
                name: "Souvenir",
                type: "multi-select",
                options: [
                    { id: "true", name: "Yes" },
                    { id: "false", name: "No" }
                ]
            },
            { prop: "phase", name: "Phase", type: "multi-select", options: phase },
            {
                prop: "stattrak",
                name: "StatTrak™",
                type: "multi-select",
                options: [
                    { id: "true", name: "Yes" },
                    { id: "false", name: "No" }
                ]
            },
            { prop: "team", name: "Team", type: "multi-select", options: team },
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
    }
}

export default class SkinService {
    async query({
        search,
        filters
    }: {
        search: string
        filters: { [prop: string]: string[] }
    }) {
        const built = await getOrBuild("skins", build)
        return {
            items: filterItems(built.items, search, filters),
            filters: built.filters
        }
    }
}
