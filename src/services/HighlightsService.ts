import { cachedGet } from "../utils/apiCache"
import { filterItems, generateOptions } from "../utils"

export default class HighlightsService {
    async query({
        search,
        filters
    }: {
        search: string
        filters: { [prop: string]: string[] }
    }) {
        let items = await cachedGet<any[]>(
            `https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/highlights.json`
        )

        const filterList = [
            {
                prop: "tournament_event",
                name: "Tournament",
                type: "multi-select",
                options: generateOptions(items, {
                    type: "fromProperty",
                    property: "tournament_event"
                })
            },
            {
                prop: "tournament_player",
                name: "Player",
                type: "multi-select",
                options: generateOptions(items, {
                    type: "fromProperty",
                    property: "tournament_player"
                })
            },
            {
                prop: "map",
                name: "Map",
                type: "multi-select",
                options: generateOptions(items, {
                    type: "fromProperty",
                    property: "map"
                })
            },
            {
                prop: "stage",
                name: "Stage",
                type: "multi-select",
                options: generateOptions(items, {
                    type: "fromProperty",
                    property: "stage"
                })
            },
            {
                prop: "team0",
                name: "Team 0",
                type: "multi-select",
                options: generateOptions(items, {
                    type: "fromProperty",
                    property: "team0"
                })
            },
            {
                prop: "team1",
                name: "Team 1",
                type: "multi-select",
                options: generateOptions(items, {
                    type: "fromProperty",
                    property: "team1"
                })
            }
        ]

        return {
            items: filterItems(items, search, filters),
            filters: filterList
        }
    }
}
