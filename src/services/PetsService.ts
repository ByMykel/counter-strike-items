import { cachedGet } from "../utils/apiCache"
import { filterItems, generateOptionsBatch } from "../utils"
import { getOrBuild, BuiltCategory } from "../utils/processedCache"
import { CSItem } from "../types"

async function build(): Promise<BuiltCategory> {
    const items = await cachedGet<CSItem[]>(
        `https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/pets.json`
    )

    const [breed] = generateOptionsBatch(items, [
        { type: "fromProperty", property: "breed" }
    ])

    return {
        items,
        filters: [
            {
                prop: "breed",
                name: "Breed",
                type: "multi-select",
                options: breed
            }
        ]
    }
}

export default class PetsService {
    async query({
        search,
        filters
    }: {
        search: string
        filters: { [prop: string]: string[] }
    }) {
        const built = await getOrBuild("pets", build)
        return {
            items: filterItems(built.items, search, filters),
            filters: built.filters
        }
    }
}
