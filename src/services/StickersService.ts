import axios from "axios"
import uniqBy from "lodash.uniqby"

export default class StickersService {
    async query({
        search,
        filters
    }: {
        search: string
        filters: { [prop: string]: (string | boolean)[] }
    }) {
        let items: {
            name: string
            type: string
            effect: string
            tournament_event: string
            tournament_team: string
            tournament_player: string
            rarity: { id: string; name: string }
            crates: { id: string; name: string }[]
            /* more properties */
        }[] = await axios
            .get("https://bymykel.github.io/CSGO-API/api/en/stickers.json")
            .then((res) => res.data)

        const filterList = [
            {
                prop: "rarity",
                name: "Rarity",
                type: "multi-select",
                options: uniqBy(
                    items.map((item) => ({
                        id: item.rarity.id,
                        name: item.rarity.name
                    })),
                    "id"
                )
            },
            {
                prop: "crates",
                name: "Crate",
                type: "multi-select",
                options: uniqBy(
                    items.flatMap((item) => item?.crates ?? []),
                    "id"
                )
            },
            {
                prop: "type",
                name: "Type",
                type: "multi-select",
                options: [
                    ...new Set(
                        items
                            .filter((item) => item.type != null)
                            .map((item) => item.type)
                    )
                ].map((id) => ({
                    id: id,
                    name: id
                }))
            },
            {
                prop: "effect",
                name: "Effect",
                type: "multi-select",
                options: [
                    ...new Set(
                        items
                            .filter((item) => item.effect != null)
                            .map((item) => item.effect)
                    )
                ].map((id) => ({
                    id: id,
                    name: id
                }))
            },
            {
                prop: "tournament_event",
                name: "Tournament",
                type: "multi-select",
                options: [
                    ...new Set(
                        items
                            .filter((item) => item.tournament_event != null)
                            .map((item) => item.tournament_event)
                    )
                ].map((id) => ({
                    id: id,
                    name: id
                }))
            },
            {
                prop: "tournament_team",
                name: "Team",
                type: "multi-select",
                options: [
                    ...new Set(
                        items
                            .filter((item) => item.tournament_team != null)
                            .map((item) => item.tournament_team)
                    )
                ].map((id) => ({
                    id: id,
                    name: id
                }))
            },
            {
                prop: "tournament_player",
                name: "Player",
                type: "multi-select",
                options: [
                    ...new Set(
                        items
                            .filter((item) => item.tournament_player != null)
                            .map((item) => item.tournament_player)
                    )
                ].map((id) => ({
                    id: id,
                    name: id
                }))
            }
        ]

        if (search || Object.keys(filters).length > 0) {
            items = items.filter((item) => {
                const matchName = item.name
                    .toLowerCase()
                    .includes(search.toLowerCase())

                const matchFilters = Object.keys(filters).every((prop) => {
                    const itemProp = (item as any)[prop]
                    const filterIds = filters[prop]

                    if (!itemProp) return false

                    if (Array.isArray(itemProp)) {
                        const itemIds = itemProp.map((item: any) => item.id)
                        return itemIds.some((id: string) =>
                            filterIds.includes(id)
                        )
                    }

                    if (
                        typeof itemProp === "string" ||
                        typeof itemProp === "boolean"
                    ) {
                        return filterIds.includes(itemProp.toString())
                    }

                    return filterIds.includes(itemProp.id)
                })

                return matchName && matchFilters
            })
        }

        return {
            items,
            filters: filterList
        }
    }
}
