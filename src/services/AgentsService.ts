import axios from "axios"
import uniqBy from "lodash.uniqby"

export default class StickersService {
    async query({
        search,
        filters
    }: {
        search: string
        filters: { [prop: string]: string[] }
    }) {
        let items: {
            name: string
            rarity: { id: string; name: string }
            team: { id: string; name: string }
            /* more properties */
        }[] = await axios
            .get("https://bymykel.github.io/CSGO-API/api/en/agents.json")
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
            }
        ]

        if (search || Object.keys(filters).length > 0) {
            items = items.filter((item) => {
                const matchName = item.name
                    .toLowerCase()
                    .includes(search.toLowerCase())

                const matchFilters = Object.keys(filters).every((prop) => {
                    return filters[prop].includes((item as any)[prop].id)
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
