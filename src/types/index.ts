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

export type Filter = {
    prop: string
    name: string
    type: string
    options: { id: string; name: string }[]
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
