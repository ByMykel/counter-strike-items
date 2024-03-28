import axios from "axios"
import { filterItems, generateOptions } from "../utils"

export default class StickersService {
    async query({
        search,
        filters
    }: {
        search: string
        filters: { [prop: string]: string[] }
    }) {
        let items = await axios
            .get(
                "https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/stickers.json"
            )
            .then((res) => res.data)

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
                prop: "crates",
                name: "Crate",
                type: "multi-select",
                options: generateOptions(items, {
                    type: "fromNestedProperty",
                    property: "crates"
                })
            },
            {
                prop: "type",
                name: "Type",
                type: "multi-select",
                options: generateOptions(items, {
                    type: "fromProperty",
                    property: "type"
                })
            },
            {
                prop: "effect",
                name: "Effect",
                type: "multi-select",
                options: generateOptions(items, {
                    type: "fromProperty",
                    property: "effect"
                })
            },
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
                prop: "tournament_team",
                name: "Team",
                type: "multi-select",
                options: generateOptions(items, {
                    type: "fromProperty",
                    property: "tournament_team"
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
            }
        ]

        return {
            items: filterItems(items, search, filters),
            filters: filterList
        }
    }
}
