import axios from "axios"
import { filterItems, getCurrentLocale, tLocal } from "../utils"

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
                `https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/${locale}/music_kits.json`
            )
            .then((res) => res.data)

        const filterList = [
            {
                prop: "exclusive",
                name: tLocal("filter_exclusive"),
                type: "multi-select",
                options: [
                    { id: "true", name: tLocal("common_yes") },
                    { id: "false", name: tLocal("common_no") }
                ]
            }
        ]

        return {
            items: filterItems(items, search, filters),
            filters: filterList
        }
    }
}
