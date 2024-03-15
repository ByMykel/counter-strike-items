import axios from "axios"
import uniqBy from "lodash.uniqby"
import sortBy from "lodash.sortby"

export default class SkinService {
    async query({
        search,
        filters
    }: {
        search: string
        filters: { [prop: string]: (string | boolean)[] }
    }) {
        let items: {
            name: string
            paint_index: string
            souvenir: Boolean
            stattrak: Boolean
            rarity: { id: string; name: string }
            team: { id: string; name: string }
            weapon: { id: string; name: string }
            wear: { id: string; name: string }
            category: { id: string; name: string }
            pattern: { id: string; name: string }
            crates: { id: string; name: string }[]
            collections: { id: string; name: string }[]
            /* more properties */
        }[] = await axios
            .get(
                "https://bymykel.github.io/CSGO-API/api/en/skins_not_grouped.json"
            )
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
                prop: "pattern",
                name: "Pattern",
                type: "multi-select",
                options: uniqBy(
                    items
                        .filter((item) => item.pattern)
                        .map((item) => ({
                            id: item.pattern.id,
                            name: item.pattern.name
                        })),
                    "id"
                )
            },
            {
                prop: "team",
                name: "Team",
                type: "multi-select",
                options: uniqBy(
                    items.map((item) => ({
                        id: item.team.id,
                        name: item.team.name
                    })),
                    "id"
                )
            },
            {
                prop: "weapon",
                name: "Weapon",
                type: "multi-select",
                options: uniqBy(
                    items
                        .filter((item) => item.weapon)
                        .map((item) => ({
                            id: item.weapon.id,
                            name: item.weapon.name
                        })),
                    "id"
                )
            },
            {
                prop: "wear",
                name: "Wear",
                type: "multi-select",
                options: uniqBy(
                    items
                        .filter((item) => item.wear)
                        .map((item) => ({
                            id: item.wear.id,
                            name: item.wear.name
                        })),
                    "id"
                )
            },
            {
                prop: "category",
                name: "Category",
                type: "multi-select",
                options: uniqBy(
                    items
                        .filter((item) => item.category)
                        .map((item) => ({
                            id: item.category.id,
                            name: item.category.name
                        })),
                    "id"
                )
            },
            {
                prop: "paint_index",
                name: "Paint index",
                type: "multi-select",
                options: sortBy(
                    [
                        ...new Set(
                            items
                                .filter((item) => item.paint_index)
                                .map((item) => item.paint_index)
                        )
                    ].map((id) => ({
                        id: id,
                        name: id
                    })),
                    (option) => parseInt(option.id)
                )
            },
            {
                prop: "souvenir",
                name: "Souvenir",
                type: "multi-select",
                options: [
                    ...new Set(
                        items
                            .filter((item) => item.souvenir != null)
                            .map((item) => item.souvenir.toString())
                    )
                ].map((id) => ({
                    id: id,
                    name: id
                }))
            },
            {
                prop: "stattrak",
                name: "StatTrak™",
                type: "multi-select",
                options: [
                    ...new Set(
                        items
                            .filter((item) => item.stattrak != null)
                            .map((item) => item.stattrak.toString())
                    )
                ].map((id) => ({
                    id: id,
                    name: id
                }))
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
                prop: "collections",
                name: "Collection",
                type: "multi-select",
                options: uniqBy(
                    items.flatMap((item) => item?.collections ?? []),
                    "id"
                )
            }
        ]

        if (search || Object.keys(filters).length > 0) {
            items = items.filter((item) => {
                const matchName = item.name
                    .toLowerCase()
                    .includes(search.toLowerCase())

                const matchFilters = Object.keys(filters).every((prop) => {
                    const itemProp = (item as any)[prop] ?? []
                    const filterIds = filters[prop]

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
