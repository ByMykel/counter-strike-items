import axios from "axios"
import {
    filterItems,
    generateOptions,
    getCurrentLocale,
    tLocal
} from "../utils"

export default class StickersService {
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
                `https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/${locale}/stickers.json`
            )
            .then((res) => res.data)

        const filterList = [
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
                prop: "crates",
                name: tLocal("filter_crate"),
                type: "multi-select",
                options: generateOptions(items, {
                    type: "fromNestedProperty",
                    property: "crates"
                })
            },
            {
                prop: "type",
                name: tLocal("filter_type"),
                type: "multi-select",
                options: generateOptions(items, {
                    type: "fromProperty",
                    property: "type"
                })
            },
            {
                prop: "effect",
                name: tLocal("filter_effect"),
                type: "multi-select",
                options: generateOptions(items, {
                    type: "fromProperty",
                    property: "effect"
                })
            },
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
                prop: "tournament_team",
                name: tLocal("filter_team"),
                type: "multi-select",
                options: generateOptions(items, {
                    type: "fromProperty",
                    property: "tournament_team"
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
            }
        ]

        return {
            items: filterItems(items, search, filters),
            filters: filterList
        }
    }
}
