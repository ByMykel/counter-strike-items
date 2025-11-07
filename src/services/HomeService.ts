import axios from "axios"
import {
    filterItems,
    getCurrentLocale,
    shuffleArrayWithSeed
} from "../utils/index"

export default class HomeService {
    async query({
        search,
        filters
    }: {
        search: string
        filters: { [prop: string]: string[] }
    }) {
        const locale = getCurrentLocale()
        let items: { name: string; image: string /* more properties */ }[] =
            await axios
                .get(
                    `https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/${locale}/all.json`
                )
                .then((res) => Object.values(res.data))

        items = items.map((item) => ({
            ...item,
            cdn_image: !item.image?.includes("githubusercontent")
        }))

        const filterList = [
            {
                prop: "cdn_image",
                name: "Valve's CDN image",
                type: "multi-select",
                options: [
                    { id: "true", name: "Yes" },
                    { id: "false", name: "No" }
                ]
            }
        ]

        let filteredItems = items
        if (Object.keys(filters).length > 0) {
            filteredItems = filterItems(items, search, filters)
        } else if (search) {
            filteredItems = filterItems(items, search)
        } else {
            filteredItems = shuffleArrayWithSeed(
                items,
                new Date().toISOString().slice(0, 10)
            )
        }

        return {
            items: filteredItems,
            filters: filterList
        }
    }

    async getAllItems() {
        const locale = getCurrentLocale()
        let items = await axios
            .get(
                `https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/${locale}/all.json`
            )
            .then((res) => res.data)

        let skins = await axios
            .get(
                `https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/${locale}/skins.json`
            )
            .then((res) => res.data)

        let collectibles = await axios
            .get(
                `https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/${locale}/collectibles.json`
            )
            .then((res) => res.data)

        const collectibleConfigs = [
            {
                type: "Tournament Finalist Trophy",
                prefix: "#CSGO_CollectibleCoin_",
                key: "tournamentFinalistTrophyByTournament"
            },
            {
                type: "Old Pick'Em Trophy",
                prefix: "#CSGO_CollectibleCoin_",
                key: "OldPickEmTrophyByTournament"
            },
            {
                type: "Fantasy Trophy",
                prefix: "#CSGO_CollectibleCoin_",
                key: "FantasyCoinByTournament"
            },
            {
                type: "Operation Coin",
                prefix: "#CSGO_Collectible_",
                key: "operationCoinByOperation"
            },
            {
                type: "Service Medal",
                prefix: "#CSGO_Collectible_",
                key: "serviceMedalByLevel"
            },
            {
                type: "Pick'Em Coin",
                prefix: "#CSGO_TournamentJournal_",
                key: "PickEmCoinByTournament"
            },
            {
                type: "Premier Season Coin",
                prefix: "#CSGO_Collectible_",
                key: "premierSeasonCoinBySeason"
            }
        ]

        const groupedCollectibles = collectibleConfigs.reduce((acc, config) => {
            acc[config.key] = collectibles.reduce(
                (groupAcc: any, item: any) => {
                    if (item.type !== config.type) return groupAcc

                    const key = item.original.item_name
                        .split(config.prefix)?.[1]
                        ?.split("_")?.[0]

                    if (!groupAcc[key]) {
                        groupAcc[key] = []
                    }

                    groupAcc[key].push(item)
                    return groupAcc
                },
                {}
            )
            return acc
        }, {} as any)

        Object.values(items).forEach((item: any) => {
            if (!item.id.startsWith("collectible-")) return
            items[item.id].related_collectibles = []

            const config = collectibleConfigs.find((c) => c.type === item.type)
            if (config) {
                const key = item.original.item_name
                    .split(config.prefix)?.[1]
                    ?.split("_")?.[0]
                if (key) {
                    items[item.id].related_collectibles =
                        groupedCollectibles[config.key][key]
                }
            }
        })

        skins.forEach((item: any) => {
            const types = ["skin"]

            if (item.stattrak) {
                types.push("skin_stattrak")
            }

            if (item.souvenir) {
                types.push("skin_souvenir")
            }

            types.forEach((type) => {
                // Vanilla skins don't have a wear
                if (item.id.startsWith("skin-vanilla")) {
                    items[item.id] = {
                        ...items[item.id],
                        crates: item.crates,
                        collections: item.collections,
                        wears: item.wears,
                        skin_souvenir: item.souvenir,
                        skin_stattrak: item.stattrak
                    }

                    if (type === "skin_stattrak") {
                        items[`${item.id}_st`] = {
                            ...items[`${item.id}_st`],
                            crates: item.crates,
                            collections: item.collections,
                            wears: item.wears,
                            skin_souvenir: item.souvenir,
                            skin_stattrak: item.stattrak
                        }
                    }
                }

                ;(item?.wears ?? []).forEach((_: any, index: number) => {
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

        let baseWeapons = await axios
            .get(
                `https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/${locale}/base_weapons.json`
            )
            .then((res) => res.data)

        baseWeapons.forEach((item: any) => {
            items[item.id] = item
        })

        return items
    }
}
