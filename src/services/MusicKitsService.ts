import { cachedGet } from "../utils/apiCache"
import { filterItems } from "../utils"
import { getOrBuild, BuiltCategory } from "../utils/processedCache"

async function build(): Promise<BuiltCategory> {
    const items = await cachedGet<any[]>(
        `https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/music_kits.json`
    )

    return {
        items,
        filters: [
            { prop: "price_range", name: "Price", type: "price-range", options: [] },
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
    }
}

export default class MusicKitsService {
    async query({
        search,
        filters
    }: {
        search: string
        filters: { [prop: string]: string[] }
    }) {
        const built = await getOrBuild("music-kits", build)
        return {
            items: filterItems(built.items, search, filters),
            filters: built.filters
        }
    }
}
