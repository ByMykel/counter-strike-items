interface Item {
    id: string
    name: string
    image: string
    rarity: {
        color: string
        id: string
        name: string
    }
    phase?: string
}

export interface ItemDetail {
    id: string
    name: string
    description: string
    crates: {
        id: string
        name: string
        image: string
    }[]
    collections: {
        id: string
        name: string
        image: string
    }[]
    contains: Item[]
    containsRare: Item[]
    specialNotes: {
        text: string
        source: string
    }[]
    wears: { id: string; name: string }[]
    skin_stattrak: boolean
    skin_souvenir: boolean
    image: string
    market_hash_name: string
    price_history: { time: number; value: number; volume: number }[]
    variants: {
        id: string
        name: string
        image: string
    }[]
    style?: { id: string; name: string; url: string }
}

export type Filter = {
    prop: string
    name: string
    type: string
    options: { id: string; name: string }[]
}
