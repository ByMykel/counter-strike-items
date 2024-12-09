import uniqBy from "lodash.uniqby"

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
    items: any,
    search = "",
    filters: { [prop: string]: string[] } = {}
) {
    // Specify which item properties the search should apply to
    const searchProperties = ["name" /* other properties */]

    if (search || Object.keys(filters).length > 0) {
        return items.filter((item: any) => {
            // Enhanced search: checks if any of the specified properties contain the search query
            const matchSearch = searchProperties.some((property) => {
                const propValue = item[property]
                return (
                    propValue &&
                    propValue
                        .toString()
                        .toLowerCase()
                        .includes(search.toLowerCase())
                )
            })

            // Filter matching: checks if item properties match all provided filters
            const matchFilters = Object.keys(filters).every((prop) => {
                const itemProp = item[prop]
                const filterValues = filters[prop]

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
                        ? itemProp.id?.toString()
                        : itemProp.toString()
                )
            })

            return matchSearch && matchFilters
        })
    }

    return items
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
