import axios from "axios"
import { shuffleArrayWithSeed } from "../utils/index"

export default class HomeService {
    async query({ search }: { search: string }) {
        let items: { name: string /* more properties */ }[] = await axios
            .get(
                "https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/all.json"
            )
            .then((res) => Object.values(res.data))

        if (search) {
            items = items.filter((item) =>
                item.name.toLowerCase().includes(search.toLowerCase())
            )

            return {
                items
            }
        }

        return {
            // Return home items randomizated based on date.
            items: shuffleArrayWithSeed(
                items,
                new Date().toISOString().slice(0, 10)
            )
        }
    }

    async getAllItems() {
        let items = await axios
            .get(
                "https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/all.json"
            )
            .then((res) => res.data)

        let skins = await axios
            .get(
                "https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/skins.json"
            )
            .then((res) => res.data)

        skins.forEach((item: any) => {
            const types = ["skin"]

            if (item.stattrak) {
                types.push("skin_stattrak")
            }

            if (item.souvenir) {
                types.push("skin_souvenir")
            }

            types.forEach((type) => {
                (item?.wears ?? []).forEach((_: any, index: number) => {
                    if (type === "skin_stattrak") {
                        items[`${item.id}_${index}_st`] = {
                            ...items[`${item.id}_${index}_st`],
                            crates: item.crates,
                            collections: item.collections,
                            wears: item.wears,
                            skin_souvenir: item.souvenir,
                            skin_stattrak: item.stattrak
                        }
                    } else if (type === "skin_souvenir") {
                        items[`${item.id}_${index}_so`] = {
                            ...items[`${item.id}_${index}_so`],
                            crates: item.crates,
                            collections: item.collections,
                            wears: item.wears,
                            skin_souvenir: item.souvenir,
                            skin_stattrak: item.stattrak
                        }
                    } else {
                        items[`${item.id}_${index}`] = {
                            ...items[`${item.id}_${index}`],
                            crates: item.crates,
                            collections: item.collections,
                            wears: item.wears,
                            skin_souvenir: item.souvenir,
                            skin_stattrak: item.stattrak
                        }
                    }
                })
            })
        })

        return items
    }
}
