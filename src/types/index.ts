export interface ItemDetail {
    id: string
    name: string
    description: string
    crates?: Crate[]
    collections?: Collection[]
    contains?: Contain[]
    containsRare?: Contain[]
    specialNotes?: specialNotes[]
    wears?: Wear[]
    skin_stattrak?: boolean
    skin_souvenir?: boolean
    image: string
    market_hash_name: string
    price_history: { time: number; value: number | null; volume: number }[]
    variants?: variant[]
    style?: Style
    related_collectibles?: Collectible[]
    image_inventory: string
}

interface variant {
    id: string
    name: string
    image: string
}

interface Contain {
    id: string
    name: string
    image: string
    rarity: Rarity
    paint_index: string | null
    phase: string | null
}

interface specialNotes {
    text: string
    source: string
}

export type FilterOption = {
    id: string | null
    name: string
}

export type Filter = {
    prop: string
    name: string
    type: string
    options: FilterOption[]
}

/**
 * A CS item from the CSGO-API. The API returns many different item shapes
 * (skins, stickers, agents, crates, …) and the app filters them generically
 * by arbitrary property names, so only the fields consumed directly by the UI
 * are typed; the index signature covers the rest.
 */
export interface CSItem {
    id: string
    name: string
    description?: string
    image?: string
    market_hash_name?: string
    rarity?: { id: string; name: string; color?: string } | null
    souvenir?: boolean
    stattrak?: boolean
    genuine?: boolean
    phase?: string | null
    // Highlight / video items
    video?: string
    thumbnail?: string
    // Category-specific properties read by the generic filter/option code.
    [key: string]: any
}

interface Rarity {
    id: string
    name: string
    color: string
}

interface Wear {
    id: string
    name: string
}

interface Collection {
    id: string
    name: string
    image: string
}

interface Crate {
    id: string
    name: string
    image: string
}

interface Style {
    id: string
    name: string
    url: string
}

interface Collectible {
    id: string
    name: string
    image: string
}
