import { cachedGet } from "../utils/apiCache"
import { filterItems, generateOptionsBatch } from "../utils"
import { getOrBuild, BuiltCategory } from "../utils/processedCache"
import { CSItem } from "../types"

async function build(): Promise<BuiltCategory> {
    const items = await cachedGet<CSItem[]>(
        `https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/highlights.json`
    )

    const [tournamentEvent, tournamentPlayer, map, stage, team0, team1] =
        generateOptionsBatch(items, [
            { type: "fromProperty", property: "tournament_event" },
            { type: "fromProperty", property: "tournament_player" },
            { type: "fromProperty", property: "map" },
            { type: "fromProperty", property: "stage" },
            { type: "fromProperty", property: "team0" },
            { type: "fromProperty", property: "team1" }
        ])

    return {
        items,
        filters: [
            { prop: "price_range", name: "Price", type: "price-range", options: [] },
            { prop: "tournament_event", name: "Tournament", type: "multi-select", options: tournamentEvent },
            { prop: "tournament_player", name: "Player", type: "multi-select", options: tournamentPlayer },
            { prop: "map", name: "Map", type: "multi-select", options: map },
            { prop: "stage", name: "Stage", type: "multi-select", options: stage },
            { prop: "team0", name: "Team 0", type: "multi-select", options: team0 },
            { prop: "team1", name: "Team 1", type: "multi-select", options: team1 }
        ]
    }
}

export default class SouvenirCharmService {
    async query({
        search,
        filters
    }: {
        search: string
        filters: { [prop: string]: string[] }
    }) {
        const built = await getOrBuild("souvenir-charm", build)
        return {
            items: filterItems(built.items, search, filters),
            filters: built.filters
        }
    }
}
