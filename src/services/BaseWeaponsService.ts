import { cachedGet } from "../utils/apiCache"
import { filterItems } from "../utils"
import { getOrBuild, BuiltCategory } from "../utils/processedCache"
import { CSItem } from "../types"

async function build(): Promise<BuiltCategory> {
    const items = await cachedGet<CSItem[]>(
        `https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/base_weapons.json`
    )

    return { items, filters: [] }
}

export default class BaseWeaponsService {
    async query({
        search,
        filters
    }: {
        search: string
        filters: { [prop: string]: string[] }
    }) {
        const built = await getOrBuild("base-weapons", build)
        return {
            items: filterItems(built.items, search, filters),
            filters: built.filters
        }
    }
}
