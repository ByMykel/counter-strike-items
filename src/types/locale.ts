import { CurrencyCode } from "./currency"

export type SupportedLocale = (typeof supportedLocales)[number]

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

export const localeToCurrencyMap: Record<SupportedLocale, CurrencyCode> = {
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
