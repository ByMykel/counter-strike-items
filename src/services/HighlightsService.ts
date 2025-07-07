import axios from "axios"
import {
    filterItems,
    generateOptions,
    getCurrentLocale,
    tLocal
} from "../utils"

export default class HighlightsService {
    async query({
        search,
        filters
    }: {
        search: string
        filters: { [prop: string]: string[] }
    }) {
        const locale = getCurrentLocale()
        let items = await axios
            .get(
                `https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/${locale}/highlights.json`
            )
            .then((res) => res.data)

        const filterList = [
            {
                prop: "tournament_event",
                name: tLocal("filter_tournament"),
                type: "multi-select",
                options: generateOptions(items, {
                    type: "fromProperty",
                    property: "tournament_event"
                })
            },
            {
                prop: "tournament_player",
                name: tLocal("filter_player"),
                type: "multi-select",
                options: generateOptions(items, {
                    type: "fromProperty",
                    property: "tournament_player"
                })
            },
            {
                prop: "map",
                name: tLocal("filter_map"),
                type: "multi-select",
                options: generateOptions(items, {
                    type: "fromProperty",
                    property: "map"
                })
            },
            {
                prop: "stage",
                name: tLocal("filter_stage"),
                type: "multi-select",
                options: generateOptions(items, {
                    type: "fromProperty",
                    property: "stage"
                })
            },
            {
                prop: "team0",
                name: tLocal("filter_team") + " 0",
                type: "multi-select",
                options: generateOptions(items, {
                    type: "fromProperty",
                    property: "team0"
                })
            },
            {
                prop: "team1",
                name: tLocal("filter_team") + " 1",
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
