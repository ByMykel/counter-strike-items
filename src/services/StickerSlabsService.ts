import { cachedGet } from "../utils/apiCache"
import { filterItems, generateOptionsBatch } from "../utils"
import { getOrBuild, BuiltCategory } from "../utils/processedCache"

async function build(): Promise<BuiltCategory> {
    const items = await cachedGet<any[]>(
        `https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/sticker_slabs.json`
    )

    const [rarity, crates, collections, type, effect, tournament, team, player] =
        generateOptionsBatch(items, [
            { type: "fromNestedSingleProperty", property: "rarity" },
            { type: "fromNestedProperty", property: "crates" },
            { type: "fromNestedProperty", property: "collections" },
            { type: "fromProperty", property: "type" },
            { type: "fromProperty", property: "effect" },
            { type: "fromNestedSingleProperty", property: "tournament" },
            { type: "fromNestedSingleProperty", property: "team" },
            { type: "fromNestedSingleProperty", property: "player" }
        ])

    return {
        items,
        filters: [
            { prop: "price_range", name: "Price", type: "price-range", options: [] },
            { prop: "rarity", name: "Rarity", type: "multi-select", options: rarity },
            { prop: "crates", name: "Crate", type: "multi-select", options: crates },
            { prop: "collections", name: "Collections", type: "multi-select", options: collections },
            { prop: "type", name: "Type", type: "multi-select", options: type },
            { prop: "effect", name: "Effect", type: "multi-select", options: effect },
            { prop: "tournament", name: "Tournament", type: "multi-select", options: tournament },
            { prop: "team", name: "Team", type: "multi-select", options: team },
            { prop: "player", name: "Player", type: "multi-select", options: player }
        ]
    }
}

export default class StickerSlabsService {
    async query({
        search,
        filters
    }: {
        search: string
        filters: { [prop: string]: string[] }
    }) {
        const built = await getOrBuild("sticker-slabs", build)
        return {
            items: filterItems(built.items, search, filters),
            filters: built.filters
        }
    }
}
