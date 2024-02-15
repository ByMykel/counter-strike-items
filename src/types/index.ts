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
    image: string
}
