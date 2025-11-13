export type SupportedLocale = (typeof supportedLocales)[number]

export const supportedLocales = ["en", "zh-CN"]

export const languages = [
    {
        id: "en",
        name: "English",
        flag: "https://hatscripts.github.io/circle-flags/flags/us.svg"
    },
    {
        id: "zh-CN",
        name: "Chinese (Simplified)",
        flag: "https://hatscripts.github.io/circle-flags/flags/cn.svg"
    }
]
