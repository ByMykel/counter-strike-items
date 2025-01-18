import { supportedLocales } from "../constants"

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

export type SupportedLocale = (typeof supportedLocales)[number]

export type Currency =
    | "USD"
    | "EUR"
    | "GBP"
    | "CNY"
    | "JPY"
    | "CAD"
    | "AUD"
    | "HKD"
    | "ISK"
    | "PHP"
    | "DKK"
    | "HUF"
    | "CZK"
    | "RON"
    | "SEK"
    | "IDR"
    | "INR"
    | "BRL"
    | "RUB"
    | "HRK"
    | "THB"
    | "CHF"
    | "MYR"
    | "BGN"
    | "TRY"
    | "NOK"
    | "NZD"
    | "ZAR"
    | "MXN"
    | "SGD"
    | "ILS"
    | "KRW"
    | "PLN"
    | "AED"
    | "ARS"
    | "CLP"
    | "COP"
    | "CRC"
    | "KWD"
    | "KZT"
    | "PEN"
    | "QAR"
    | "SAR"
    | "TWD"
    | "UAH"
    | "UYU"
    | "VND"
    | "GEL"
    | "BTC"
    | "ETH"
    | "FET"
