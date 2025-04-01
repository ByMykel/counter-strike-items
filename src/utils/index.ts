import Fuse from "fuse.js"
import uniqBy from "lodash.uniqby"
import { messages } from "../locales"
import {
    localeToCurrencyMap,
    SupportedLocale,
    supportedLocales
} from "../types/locale"
import { STORAGE_KEY_LOCALE } from "../constants/locale"
import { CurrencyCode } from "../types/currency"
import { currencies, STORAGE_KEY_CURRENCY } from "../constants/currency"

function hashString(str: string) {
    let hash = 0
    if (str.length === 0) {
        return hash
    }
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i)
        hash = (hash << 5) - hash + char
        hash &= hash // Convert to 32bit integer
    }
    return hash
}

export function shuffleArrayWithSeed(array: any[], str = "") {
    let seed = hashString(str)
    const seededRandom = (max: number) => {
        const x = Math.sin(seed++) * 10000
        return Math.floor((x - Math.floor(x)) * (max + 1))
    }

    for (let i = array.length - 1; i > 0; i--) {
        const j = seededRandom(i)
        ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
}

/**
 * Filters an array of items based on a search query and a set of filters.
 *
 * @param {Array} items - The array of items to filter.
 * @param {string} search - A search query used to match item properties. The search is case-insensitive.
 * @param {Object} filters - An object where each key corresponds to an item property to filter on,
 *                           and each value is an array of allowed values for that property.
 *                           The filtering supports string, boolean, and object properties containing an `id`.
 *
 * Examples of filters:
 * - To filter items by a string or boolean property: { color: ['red', 'blue'], available: [true] }
 * - To filter items by properties of nested objects (assuming an 'id' field): { category: ['1', '2'] }
 *
 * The function also enhances the search algorithm by allowing the search to apply to multiple item properties,
 * not just the 'name' property. This requires specifying which properties to include in the search.
 *
 * @returns {Array} The filtered array of items.
 */
export function filterItems(
    items: any[],
    search = "",
    filters: { [prop: string]: string[] } = {}
) {
    // Specify which item properties the search should apply to
    const searchProperties = ["name" /* other properties */]

    let filteredItems = items
    if (search) {
        const fuse = new Fuse(items, {
            keys: searchProperties,
            threshold: 0.4,
            includeScore: false,
            shouldSort: true,
            findAllMatches: true,
            useExtendedSearch: true
        })

        const searchResults = fuse.search(search)
        filteredItems = searchResults.map((result) => result.item)
    }

    if (Object.keys(filters).length > 0) {
        filteredItems = filteredItems.filter((item) => {
            return Object.keys(filters).every((prop) => {
                const itemProp = item[prop]
                const filterValues = filters[prop]

                if (itemProp == null && filterValues.includes("null"))
                    return true
                if (itemProp == null) return false

                if (Array.isArray(itemProp)) {
                    // If the item property is an array, check if any of its values match the filters
                    return itemProp
                        .map((subItem) => subItem.id)
                        .some((id) => filterValues.includes(id))
                }

                // Direct match for string, boolean, or object with an 'id'
                return filterValues.includes(
                    typeof itemProp === "object"
                        ? itemProp?.id?.toString()
                        : itemProp.toString()
                )
            })
        })
    }

    return filteredItems
}

/**
 * Generates unique options for filtering from an array of items based on a configuration.
 *
 * @param {Array} items - The array of items from which to generate filter options.
 * @param {Object} config - Configuration object specifying how to extract and process options.
 *    - type: Specifies the method of extraction. Can be one of "fromProperty", "fromNestedProperty", or "fromNestedSingleProperty".
 *    - property: The name of the property from items to base the options on.
 *
 * Examples of config:
 *
 * - For a simple property on each item (e.g., "type" where each item has a type property that's a string):
 *   { type: "fromProperty", property: "type" }
 *
 * - For a nested property array on each item (e.g., "crates" where each item may have an array of crate objects, each with its own id and name):
 *   { type: "fromNestedProperty", property: "crates" }
 *
 * - For a nested single property on each item (e.g., "rarity" where each item has a rarity object with its own id and name):
 *   { type: "fromNestedSingleProperty", property: "rarity" }
 *
 * @returns {Array} A unique array of options based on the provided configuration.
 */
export function generateOptions(
    items: any,
    config: any
): { id: string; name: string }[] {
    let options = []

    switch (config.type) {
        case "fromProperty":
            // Directly maps each item's specified property to an option, assuming the property is a simple value.
            options = items
                .filter((item: any) => item[config.property])
                .map((item: any) => {
                    const value = item[config.property]
                    return { id: String(value), name: String(value) }
                })
            break
        case "fromNestedProperty":
            // Maps and flattens items' specified nested array property to options, assuming each object in the array has id and name.
            options = items.flatMap((item: any) => {
                const value = item[config.property]
                return value
                    ? value.map((v: any) => ({
                          id: String(v.id),
                          name: String(v.name)
                      }))
                    : []
            })
            break
        case "fromNestedSingleProperty":
            // Maps each item's specified nested property to an option, assuming the nested object has id and name.
            options = items
                .filter((item: any) => item[config.property])
                .map((item: any) => {
                    const value = item[config.property]
                    if (String(value.id) === "null") {
                        return { id: null, name: "None" }
                    }
                    return { id: String(value.id), name: String(value.name) }
                })
            break
        default:
            console.error("Invalid config type")
            return []
    }

    // Removing duplicates for all cases based on the id to ensure uniqueness
    // TODO: avoid using ts-ignore
    // @ts-ignore
    return uniqBy(options.filter(Boolean), "id")
}

export function getCurrentLocale(): SupportedLocale {
    const storedLocale = localStorage.getItem(
        STORAGE_KEY_LOCALE
    ) as SupportedLocale | null
    if (storedLocale && supportedLocales.includes(storedLocale)) {
        return storedLocale
    }
    const detectedLocale = detectLocale()
    localStorage.setItem(STORAGE_KEY_LOCALE, detectedLocale)
    return detectedLocale
}

export function getCurrentLocaleFullName() {
    const locale = getCurrentLocale()
    return {
        bg: "bulgarian",
        cs: "czech",
        da: "danish",
        de: "german",
        el: "greek",
        en: "english",
        "es-ES": "spanish",
        "es-MX": "latam",
        fi: "finnish",
        fr: "french",
        hu: "hungarian",
        it: "italian",
        ja: "japanese",
        ko: "korean",
        nl: "dutch",
        no: "norwegian",
        pl: "polish",
        "pt-BR": "brazilian",
        "pt-PT": "portuguese",
        ro: "romanian",
        ru: "russian",
        sk: "slovak",
        sv: "swedish",
        th: "thai",
        tr: "turkish",
        uk: "ukrainian",
        "zh-CN": "schinese",
        "zh-TW": "tchinese",
        vi: "vietnamese"
    }[locale]
}

export function detectLocale(): SupportedLocale {
    const browserLanguages = navigator.languages || [navigator.language]
    for (const lang of browserLanguages) {
        if (supportedLocales.includes(lang as SupportedLocale)) {
            return lang as SupportedLocale
        }
        if (lang.startsWith("es-")) {
            return "es-MX"
        }
    }
    return "en" // Default fallback
}

export function changeLocale(locale: SupportedLocale) {
    localStorage.setItem(STORAGE_KEY_LOCALE, locale)
    location.reload()
}

export function getCurrentCurrency(): CurrencyCode {
    const storedCurrency = localStorage.getItem(
        STORAGE_KEY_CURRENCY
    ) as CurrencyCode | null
    if (storedCurrency && currencies.find(({ id }) => id === storedCurrency)) {
        return storedCurrency
    }
    return localeToCurrencyMap[getCurrentLocale()]
}

export function changeCurrency(currency: CurrencyCode) {
    localStorage.setItem(STORAGE_KEY_CURRENCY, currency)
    location.reload()
}

export function tLocal(key: string) {
    const locale = getCurrentLocale()

    if (messages?.[locale]?.[key]) {
        return messages?.[locale]?.[key]
    } else {
        console.warn(
            `[tLocal] Not found '${key}' key in '${locale}' locale messages.`
        )
    }

    if (messages?.en?.[key]) {
        console.warn(
            `[tLocal] Fall back to translate '${key}' key with 'en' locale.`
        )
        return messages?.en?.[key]
    } else {
        console.warn(`[tLocal] Not found '${key}' key in 'en' locale messages.`)
    }

    return key
}
