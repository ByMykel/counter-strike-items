import Fuse from "fuse.js"
import { CSItem, FilterOption } from "../types"

const fuseCache = new Map<string, Fuse<CSItem>>()

function getFuseIndex(items: CSItem[], keys: string[]): Fuse<CSItem> {
    const first = items[0]?.id ?? ""
    const last = items[items.length - 1]?.id ?? ""
    const cacheKey = `${items.length}:${first}:${last}`

    let fuse = fuseCache.get(cacheKey)
    if (fuse) return fuse

    fuse = new Fuse(items, {
        keys,
        threshold: 0.3,
        includeScore: true,
        shouldSort: true,
        findAllMatches: true,
        useExtendedSearch: false,
        ignoreLocation: true,
        minMatchCharLength: 2
    })

    fuseCache.set(cacheKey, fuse)
    return fuse
}

function exactTokenMatch(item: CSItem, tokens: string[]): boolean {
    const name = (item.name ?? "").toLowerCase()
    const marketName = (item.market_hash_name ?? "").toLowerCase()
    return tokens.every(
        (token) => name.includes(token) || marketName.includes(token)
    )
}

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

export function shuffleArrayWithSeed<T>(array: T[], str = ""): T[] {
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
    items: CSItem[],
    search = "",
    filters: { [prop: string]: string[] } = {}
): CSItem[] {
    const searchProperties = ["name", "market_hash_name"]

    let filteredItems = items
    if (search) {
        const query = search.toLowerCase().trim()
        const tokens = query.split(/\s+/).filter(Boolean)

        // Exact substring matches first (tokenized AND: all tokens must appear)
        const exactMatches = items.filter((item) =>
            exactTokenMatch(item, tokens)
        )

        // Fuzzy matches for typo tolerance
        const fuse = getFuseIndex(items, searchProperties)
        const fuseResults = fuse.search(search)

        // Merge: exact matches first, then fuzzy (deduplicated)
        const seen = new Set(exactMatches.map((item) => item.id))
        const fuzzyOnly = fuseResults
            .filter((result) => !seen.has(result.item.id))
            .map((result) => result.item)

        filteredItems = [...exactMatches, ...fuzzyOnly]
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

type OptionConfig = {
    type:
        | "fromProperty"
        | "fromNestedProperty"
        | "fromNestedSingleProperty"
    property: string
}

/**
 * Like `generateOptions`, but computes several filter option-sets in a single
 * pass over `items` (instead of one full pass per filter). Returns the option
 * arrays in the same order as `configs`.
 */
export function generateOptionsBatch(
    items: CSItem[],
    configs: OptionConfig[]
): FilterOption[][] {
    const seen = configs.map(() => new Set<string>())
    const out: FilterOption[][] = configs.map(() => [])

    for (const item of items) {
        for (let i = 0; i < configs.length; i++) {
            const { type, property } = configs[i]
            const value = item[property]

            switch (type) {
                case "fromProperty": {
                    if (!value) break
                    const id = String(value)
                    if (!seen[i].has(id)) {
                        seen[i].add(id)
                        out[i].push({ id, name: id })
                    }
                    break
                }
                case "fromNestedSingleProperty": {
                    if (!value) break
                    if (String(value.id) === "null") {
                        if (!seen[i].has("null")) {
                            seen[i].add("null")
                            // Nested prop explicitly "null" → a "None" option.
                            out[i].push({ id: null, name: "None" })
                        }
                        break
                    }
                    const id = String(value.id)
                    if (!seen[i].has(id)) {
                        seen[i].add(id)
                        out[i].push({ id, name: String(value.name) })
                    }
                    break
                }
                case "fromNestedProperty": {
                    if (!value) break
                    for (const v of value) {
                        const id = String(v.id)
                        if (!seen[i].has(id)) {
                            seen[i].add(id)
                            out[i].push({ id, name: String(v.name) })
                        }
                    }
                    break
                }
            }
        }
    }

    return out
}
