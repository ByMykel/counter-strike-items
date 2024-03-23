import axios from "axios"
import { filterItems } from "../utils"

export default class StickersService {
    async query({
        search,
        filters
    }: {
        search: string
        filters: { [prop: string]: string[] }
    }) {
        let items = await axios
            .get("https://bymykel.github.io/CSGO-API/api/en/music_kits.json")
            .then((res) => res.data)

        const filterList = [
            {
                prop: "exclusive",
                name: "Exclusive",
                type: "multi-select",
                options: [
                    { id: "true", name: "Yes" },
                    { id: "false", name: "No" }
                ]
            }
        ]

        return {
            items: filterItems(items, search, filters),
            filters: filterList
        }
    }
}
