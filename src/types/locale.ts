export type SupportedLocale = (typeof supportedLocales)[number]

export const supportedLocales = ["en", "es-ES", "pt-BR", "ru", "zh-CN"]

export const languages = [
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
        id: "pt-BR",
        name: "Portuguese (Brazil)",
        flag: "https://hatscripts.github.io/circle-flags/flags/br.svg"
    },
    {
        id: "ru",
        name: "Russian",
        flag: "https://hatscripts.github.io/circle-flags/flags/ru.svg"
    },
    {
        id: "zh-CN",
        name: "Chinese (Simplified)",
        flag: "https://hatscripts.github.io/circle-flags/flags/cn.svg"
    }
]
