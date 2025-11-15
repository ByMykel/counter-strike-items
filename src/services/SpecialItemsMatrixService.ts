import SkinService from "./SkinService"
import StickersService from "./StickersService"

export interface Crate {
    id: string
    name: string
    image: string
}

export interface Knife {
    id: string
    name: string
    image: string
    phase: string | null
    crates: Crate[]
    pattern: { id: string; name: string } | null
    weapon: { id: string; name: string } | null
}

export interface TeamSticker {
    id: string
    name: string
    image: string
    tournament: { id: string; name: string }
    team: { id: string; name: string }
}

export interface PlayerSticker {
    id: string
    name: string
    image: string
    tournament: { id: string; name: string }
    player: { id: string; name: string }
}

// Simplified item for matrix cells
export interface MatrixItem {
    id: string
    name: string
    image: string
}

export interface CellData {
    items: MatrixItem[]
    crates?: Crate[]
}

export interface ProcessedMatrixData {
    columns: string[]
    rows: string[]
    rowDisplayMap: Map<string, string>
    matrixMap: Map<string, CellData>
}

export interface TabData {
    id: string
    name: string
    columns: string[]
    rows: string[]
    rowDisplayMap: Map<string, string>
    matrixMap: Map<string, CellData>
    showCrates?: boolean // Whether to show crates for this tab
    showOnlyFirstItem?: boolean // Whether to show only the first item (true) or all items (false)
}

export default class SpecialItemsMatrixService {
    private skinService = new SkinService()
    private stickersService = new StickersService()

    async loadKnives(): Promise<Knife[]> {
        const seensSkins = new Set<string>()
        return this.skinService
            .query({
                search: "",
                filters: {
                    category: ["sfui_invpanel_filter_melee"]
                }
            })
            .then((response) => {
                response.items = response.items.filter((skin: any) => {
                    if (seensSkins.has(skin.skin_id)) {
                        return false
                    }

                    seensSkins.add(skin.skin_id)

                    return true
                })

                return response.items
            })
    }

    async loadTeamStickers(): Promise<TeamSticker[]> {
        return this.stickersService
            .query({ search: "", filters: {} })
            .then((response) => {
                return response.items.filter(
                    (sticker: any) =>
                        sticker.tournament && sticker.team && !sticker.player
                )
            })
    }

    async loadPlayerStickers(): Promise<PlayerSticker[]> {
        return this.stickersService
            .query({ search: "", filters: {} })
            .then((response) => {
                return response.items.filter(
                    (sticker: any) => sticker.tournament && sticker.player
                )
            })
    }

    /**
     * Main method that loads and returns all tab data for the matrix page.
     * To add a new tab, simply add a new entry to the returned array.
     */
    async loadAllTabsData(): Promise<TabData[]> {
        // Load all raw data in parallel
        const [knives, teamStickers, playerStickers] = await Promise.all([
            this.loadKnives(),
            this.loadTeamStickers(),
            this.loadPlayerStickers()
        ])

        const tabs: TabData[] = []

        const knivesData = this.processKnives(knives)
        tabs.push({
            id: "knives",
            name: "Knives",
            showCrates: true,
            showOnlyFirstItem: false,
            ...knivesData
        })

        const teamStickersData = this.processTeamStickers(teamStickers)
        tabs.push({
            id: "team-stickers",
            name: "Team Stickers",
            showCrates: false,
            showOnlyFirstItem: true,
            ...teamStickersData
        })

        const playerStickersData = this.processPlayerStickers(playerStickers)
        tabs.push({
            id: "player-stickers",
            name: "Player Stickers",
            showCrates: false,
            showOnlyFirstItem: true,
            ...playerStickersData
        })

        return tabs
    }

    private processMatrix<
        T extends { id: string; name: string; image: string }
    >(
        items: T[],
        config: {
            getColumnValue: (item: T) => string
            getRowKey: (item: T) => string
            getRowDisplay: (item: T, rowKey: string) => string
            getRowItem: (item: T) => T
            includeCrates?: (item: T) => Crate[] | undefined
            showCountInDisplay?: boolean
            customSort?: (
                a: { key: string; display: string; count: number },
                b: { key: string; display: string; count: number }
            ) => number
        }
    ): ProcessedMatrixData {
        const columnsSet = new Set<string>()
        const rowMap = new Map<string, T>()

        // Collect columns and rows
        for (const item of items) {
            const columnValue = config.getColumnValue(item)
            columnsSet.add(columnValue)
            const rowKey = config.getRowKey(item)
            if (!rowMap.has(rowKey)) {
                rowMap.set(rowKey, config.getRowItem(item))
            }
        }

        const columns = Array.from(columnsSet).sort()

        // Pre-compute matrix map
        const map = new Map<string, CellData>()
        for (const item of items) {
            const columnValue = config.getColumnValue(item)
            const rowKey = config.getRowKey(item)
            const key = `${rowKey}|${columnValue}`

            if (!map.has(key)) {
                map.set(key, {
                    items: [],
                    ...(config.includeCrates ? { crates: [] } : {})
                })
            }

            const cellData = map.get(key)!
            cellData.items.push({
                id: item.id,
                name: item.name,
                image: item.image
            })

            if (config.includeCrates) {
                const crates = config.includeCrates(item)
                if (crates) {
                    cellData.crates!.push(...crates)
                }
            }
        }

        // Count occurrences for each row
        const rowCount = new Map<string, Set<string>>()
        for (const item of items) {
            const rowKey = config.getRowKey(item)
            const columnValue = config.getColumnValue(item)
            if (!rowCount.has(rowKey)) {
                rowCount.set(rowKey, new Set())
            }
            rowCount.get(rowKey)!.add(columnValue)
        }

        const totalColumns = columns.length

        // Create row display map and sort
        const rowDisplay = new Map<string, string>()
        const sortedRows = Array.from(rowMap.entries())
            .map(([key, item]) => {
                const display = String(config.getRowDisplay(item, key) || "")
                const count = rowCount.get(key)?.size || 0
                const finalDisplay = config.showCountInDisplay
                    ? `${display} (${count}/${totalColumns})`
                    : display
                rowDisplay.set(key, finalDisplay)
                return { key, display, count }
            })
            .sort((a, b) => {
                if (config.customSort) {
                    return config.customSort(a, b)
                }
                // Default: sort by count (descending), then alphabetically
                if (b.count !== a.count) {
                    return b.count - a.count
                }
                return String(a.display).localeCompare(String(b.display))
            })

        const rows = sortedRows.map((p) => p.key)
        return {
            columns,
            rows,
            rowDisplayMap: rowDisplay,
            matrixMap: map
        }
    }

    private processTeamStickers(
        filteredItems: TeamSticker[]
    ): ProcessedMatrixData {
        return this.processMatrix(filteredItems, {
            getColumnValue: (item) => item.tournament.name,
            getRowKey: (item) => item.team.name,
            getRowDisplay: (item) => item.team.name,
            getRowItem: (item) => item,
            showCountInDisplay: true
        })
    }

    private processPlayerStickers(
        filteredItems: PlayerSticker[]
    ): ProcessedMatrixData {
        return this.processMatrix(filteredItems, {
            getColumnValue: (item) => item.tournament.name,
            getRowKey: (item) => item.player.name,
            getRowDisplay: (item) => item.player.name,
            getRowItem: (item) => item,
            showCountInDisplay: true
        })
    }

    private processKnives(filteredItems: Knife[]): ProcessedMatrixData {
        return this.processMatrix(filteredItems, {
            getColumnValue: (item) => item.weapon?.name || "Unknown",
            getRowKey: (item) => {
                const patternName = item.pattern?.name || "Vanilla"
                return item.phase
                    ? `${patternName} (${item.phase})`
                    : patternName
            },
            getRowDisplay: (item) => {
                const patternName = item.pattern?.name || "Vanilla"
                return item.phase
                    ? `${patternName} (${item.phase})`
                    : patternName
            },
            getRowItem: (item) => item,
            includeCrates: (item) => item.crates,
            customSort: (a, b) => {
                // Vanilla always comes first
                if (a.key === "Vanilla") return -1
                if (b.key === "Vanilla") return 1
                // Then sort by count (descending)
                if (b.count !== a.count) {
                    return b.count - a.count
                }
                // If same count, sort alphabetically
                return a.display.localeCompare(b.display)
            }
        })
    }
}
