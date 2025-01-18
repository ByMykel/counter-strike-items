import { Currency } from "./types"

export const LOCALE_STORAGE_KEY = "counter_strike_items_locale"
export const EXCHANGE_RATES_STORAGE_KEY = "exchange_rates"
export const EXCHANGE_RATES_LAST_FETCHED_STORAGE_KEY =
    "exchange_rates_last_fetched"
export const CURRENCY_STORAGE_KEY = "counter_strike_items_currency"

export const supportedLocales = [
    "bg",
    "cs",
    "da",
    "de",
    "el",
    "en",
    "es-ES",
    "es-MX",
    "fi",
    "fr",
    "hu",
    "it",
    "ja",
    "ko",
    "nl",
    "no",
    "pl",
    "pt-BR",
    "pt-PT",
    "ro",
    "ru",
    "sk",
    "sv",
    "th",
    "tr",
    "uk",
    "zh-CN",
    "zh-TW",
    "vi"
]

export const languages = [
    {
        id: "bg",
        name: "Bulgarian",
        flag: "https://hatscripts.github.io/circle-flags/flags/bg.svg"
    },
    {
        id: "cs",
        name: "Czech",
        flag: "https://hatscripts.github.io/circle-flags/flags/cz.svg"
    },
    {
        id: "da",
        name: "Danish",
        flag: "https://hatscripts.github.io/circle-flags/flags/dk.svg"
    },
    {
        id: "de",
        name: "German",
        flag: "https://hatscripts.github.io/circle-flags/flags/de.svg"
    },
    {
        id: "el",
        name: "Greek",
        flag: "https://hatscripts.github.io/circle-flags/flags/gr.svg"
    },
    {
        id: "en",
        name: "English",
        flag: "https://hatscripts.github.io/circle-flags/flags/us.svg"
    },
    {
        id: "es-ES",
        name: "Spanish",
        flag: "https://hatscripts.github.io/circle-flags/flags/es.svg"
    },
    {
        id: "es-MX",
        name: "Spanish (Latin America)",
        flag: "https://hatscripts.github.io/circle-flags/flags/mx.svg"
    },
    {
        id: "fi",
        name: "Finnish",
        flag: "https://hatscripts.github.io/circle-flags/flags/fi.svg"
    },
    {
        id: "fr",
        name: "French",
        flag: "https://hatscripts.github.io/circle-flags/flags/fr.svg"
    },
    {
        id: "hu",
        name: "Hungarian",
        flag: "https://hatscripts.github.io/circle-flags/flags/hu.svg"
    },
    {
        id: "it",
        name: "Italian",
        flag: "https://hatscripts.github.io/circle-flags/flags/it.svg"
    },
    {
        id: "ja",
        name: "Japanese",
        flag: "https://hatscripts.github.io/circle-flags/flags/jp.svg"
    },
    {
        id: "ko",
        name: "Korean",
        flag: "https://hatscripts.github.io/circle-flags/flags/kr.svg"
    },
    {
        id: "nl",
        name: "Dutch",
        flag: "https://hatscripts.github.io/circle-flags/flags/nl.svg"
    },
    {
        id: "no",
        name: "Norwegian",
        flag: "https://hatscripts.github.io/circle-flags/flags/no.svg"
    },
    {
        id: "pl",
        name: "Polish",
        flag: "https://hatscripts.github.io/circle-flags/flags/pl.svg"
    },
    {
        id: "pt-BR",
        name: "Portuguese (Brazil)",
        flag: "https://hatscripts.github.io/circle-flags/flags/br.svg"
    },
    {
        id: "pt-PT",
        name: "Portuguese (Portugal)",
        flag: "https://hatscripts.github.io/circle-flags/flags/pt.svg"
    },
    {
        id: "ro",
        name: "Romanian",
        flag: "https://hatscripts.github.io/circle-flags/flags/ro.svg"
    },
    {
        id: "ru",
        name: "Russian",
        flag: "https://hatscripts.github.io/circle-flags/flags/ru.svg"
    },
    {
        id: "sk",
        name: "Slovak",
        flag: "https://hatscripts.github.io/circle-flags/flags/sk.svg"
    },
    {
        id: "sv",
        name: "Swedish",
        flag: "https://hatscripts.github.io/circle-flags/flags/se.svg"
    },
    {
        id: "th",
        name: "Thai",
        flag: "https://hatscripts.github.io/circle-flags/flags/th.svg"
    },
    {
        id: "tr",
        name: "Turkish",
        flag: "https://hatscripts.github.io/circle-flags/flags/tr.svg"
    },
    {
        id: "uk",
        name: "Ukrainian",
        flag: "https://hatscripts.github.io/circle-flags/flags/ua.svg"
    },
    {
        id: "zh-CN",
        name: "Chinese (Simplified)",
        flag: "https://hatscripts.github.io/circle-flags/flags/cn.svg"
    },
    {
        id: "zh-TW",
        name: "Chinese (Traditional)",
        flag: "https://hatscripts.github.io/circle-flags/flags/tw.svg"
    },
    {
        id: "vi",
        name: "Vietnamese",
        flag: "https://hatscripts.github.io/circle-flags/flags/vn.svg"
    }
]

export const currencySigns: { [key: string]: string } = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    CNY: "¥",
    JPY: "¥",
    CAD: "$",
    AUD: "$",
    HKD: "$",
    ISK: "kr",
    PHP: "₱",
    DKK: "kr",
    HUF: "Ft",
    CZK: "Kč",
    RON: "lei",
    SEK: "kr",
    IDR: "Rp",
    INR: "₹",
    BRL: "R$",
    RUB: "₽",
    HRK: "kn",
    THB: "฿",
    CHF: "Fr",
    MYR: "RM",
    BGN: "лв",
    TRY: "₺",
    NOK: "kr",
    NZD: "$",
    ZAR: "R",
    MXN: "$",
    SGD: "$",
    ILS: "₪",
    KRW: "₩",
    PLN: "zł",
    AED: "د.إ",
    ARS: "$",
    CLP: "$",
    COP: "$",
    CRC: "₡",
    KWD: "د.ك",
    KZT: "₸",
    PEN: "S/.",
    QAR: "ر.ق",
    SAR: "ر.س",
    TWD: "NT$",
    UAH: "₴",
    UYU: "$",
    VND: "₫",
    GEL: "₾",
    BTC: "₿",
    ETH: "Ξ",
    FET: "FET"
}

export const currencies = [
    { id: "USD", name: "United States Dollar", currency: "$" },
    { id: "EUR", name: "Euro", currency: "€" },
    { id: "GBP", name: "British Pound", currency: "£" },
    { id: "CNY", name: "Chinese Yuan", currency: "¥" },
    { id: "JPY", name: "Japanese Yen", currency: "¥" },
    { id: "CAD", name: "Canadian Dollar", currency: "$" },
    { id: "AUD", name: "Australian Dollar", currency: "$" },
    { id: "HKD", name: "Hong Kong Dollar", currency: "$" },
    { id: "ISK", name: "Icelandic Króna", currency: "kr" },
    { id: "PHP", name: "Philippine Peso", currency: "₱" },
    { id: "DKK", name: "Danish Krone", currency: "kr" },
    { id: "HUF", name: "Hungarian Forint", currency: "Ft" },
    { id: "CZK", name: "Czech Koruna", currency: "Kč" },
    { id: "RON", name: "Romanian Leu", currency: "lei" },
    { id: "SEK", name: "Swedish Krona", currency: "kr" },
    { id: "IDR", name: "Indonesian Rupiah", currency: "Rp" },
    { id: "INR", name: "Indian Rupee", currency: "₹" },
    { id: "BRL", name: "Brazilian Real", currency: "R$" },
    { id: "RUB", name: "Russian Ruble", currency: "₽" },
    { id: "HRK", name: "Croatian Kuna", currency: "kn" },
    { id: "THB", name: "Thai Baht", currency: "฿" },
    { id: "CHF", name: "Swiss Franc", currency: "Fr" },
    { id: "MYR", name: "Malaysian Ringgit", currency: "RM" },
    { id: "BGN", name: "Bulgarian Lev", currency: "лв" },
    { id: "TRY", name: "Turkish Lira", currency: "₺" },
    { id: "NOK", name: "Norwegian Krone", currency: "kr" },
    { id: "NZD", name: "New Zealand Dollar", currency: "$" },
    { id: "ZAR", name: "South African Rand", currency: "R" },
    { id: "MXN", name: "Mexican Peso", currency: "$" },
    { id: "SGD", name: "Singapore Dollar", currency: "$" },
    { id: "ILS", name: "Israeli New Shekel", currency: "₪" },
    { id: "KRW", name: "South Korean Won", currency: "₩" },
    { id: "PLN", name: "Polish Zloty", currency: "zł" },
    { id: "AED", name: "United Arab Emirates Dirham", currency: "د.إ" },
    { id: "ARS", name: "Argentine Peso", currency: "$" },
    { id: "CLP", name: "Chilean Peso", currency: "$" },
    { id: "COP", name: "Colombian Peso", currency: "$" },
    { id: "CRC", name: "Costa Rican Colón", currency: "₡" },
    { id: "KWD", name: "Kuwaiti Dinar", currency: "د.ك" },
    { id: "KZT", name: "Kazakhstani Tenge", currency: "₸" },
    { id: "PEN", name: "Peruvian Nuevo Sol", currency: "S/." },
    { id: "QAR", name: "Qatari Rial", currency: "ر.ق" },
    { id: "SAR", name: "Saudi Riyal", currency: "ر.س" },
    { id: "TWD", name: "New Taiwan Dollar", currency: "NT$" },
    { id: "UAH", name: "Ukrainian Hryvnia", currency: "₴" },
    { id: "UYU", name: "Uruguayan Peso", currency: "$" },
    { id: "VND", name: "Vietnamese Đồng", currency: "₫" },
    { id: "GEL", name: "Georgian Lari", currency: "₾" },
    { id: "BTC", name: "Bitcoin", currency: "₿" },
    { id: "ETH", name: "Ethereum", currency: "Ξ" },
    { id: "FET", name: "FET Token", currency: "FET" }
]

export const localeToCurrencyMap: Record<string, Currency> = {
    bg: "BGN",
    cs: "CZK",
    da: "DKK",
    de: "EUR",
    el: "EUR",
    en: "USD",
    "es-ES": "EUR",
    "es-MX": "MXN",
    fi: "EUR",
    fr: "EUR",
    hu: "HUF",
    it: "EUR",
    ja: "JPY",
    ko: "KRW",
    nl: "EUR",
    no: "NOK",
    pl: "PLN",
    "pt-BR": "BRL",
    "pt-PT": "EUR",
    ro: "RON",
    ru: "RUB",
    sk: "USD", // We dont have SKK
    sv: "SEK",
    th: "THB",
    tr: "TRY",
    uk: "UAH",
    "zh-CN": "CNY",
    "zh-TW": "TWD",
    vi: "VND"
}
