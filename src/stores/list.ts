import { onUnmounted, onMounted, ref } from "vue"
import { defineStore, getActivePinia, type Pinia } from "pinia"
import { useRoute, useRouter } from "vue-router"
import { CSItem, Filter } from "../types"
import { usePriceStore } from "./prices"

type QueryFunction = ({
    // eslint-disable-next-line no-unused-vars
    search,
    // eslint-disable-next-line no-unused-vars
    filters
}: {
    search: string
    filters: { [prop: string]: string[] }
}) => Promise<{
    items: CSItem[]
    filters?: Filter[]
}>

export const createListStore =
    ({ query }: { query: QueryFunction }) =>
    (id: string) =>
        defineStore(`list/${id}`, () => {
            const route = useRoute()
            const router = useRouter()

            const priceStore = usePriceStore()

            const loading = ref<boolean>(false)
            const search = ref<string>("")
            const sortBy = ref<string>("")
            const rawItems = ref<CSItem[]>([])
            // Full filtered + sorted list. The view virtualizes it, so there
            // is no pagination — every matching item is exposed at once.
            const items = ref<CSItem[]>([])
            const itemsCount = ref<number>(0)
            const filters = ref<Filter[]>([])
            const filtersValues = ref<{ [prop: string]: string[] }>({})

            function sortItems() {
                if (!sortBy.value) return

                const direction = sortBy.value === "price-asc" ? 1 : -1

                items.value.sort((a, b) => {
                    const priceA =
                        priceStore.prices[a.market_hash_name ?? ""] ?? null
                    const priceB =
                        priceStore.prices[b.market_hash_name ?? ""] ?? null

                    if (priceA === null && priceB === null) return 0
                    if (priceA === null) return 1
                    if (priceB === null) return -1

                    return (priceA - priceB) * direction
                })
            }

            function applyPriceFilter() {
                const priceRange = filtersValues.value.price_range
                if (priceRange?.length === 2) {
                    const [minCents, maxCents] = priceRange.map(Number)
                    items.value = rawItems.value.filter((item) => {
                        const price =
                            priceStore.prices[item.market_hash_name ?? ""]
                        if (price == null) return false
                        if (minCents && price < minCents) return false
                        if (maxCents && price > maxCents) return false
                        return true
                    })
                } else {
                    items.value = [...rawItems.value]
                }
                sortItems()
                itemsCount.value = items.value.length
            }

            async function fetch() {
                loading.value = true
                reset()
                try {
                    const { price_range, ...serviceFilters } =
                        filtersValues.value
                    const { items: newItems, filters: newFilters } =
                        await query({
                            search: search.value,
                            filters: serviceFilters
                        })
                    rawItems.value = newItems

                    if (price_range?.length === 2) {
                        const [minCents, maxCents] = price_range.map(Number)
                        items.value = newItems.filter((item) => {
                            const price =
                                priceStore.prices[item.market_hash_name ?? ""]
                            if (price == null) return false
                            if (minCents && price < minCents) return false
                            if (maxCents && price > maxCents) return false
                            return true
                        })
                    } else {
                        items.value = [...newItems]
                    }

                    sortItems()
                    itemsCount.value = items.value.length
                    filters.value = newFilters ?? []
                } catch (error) {
                    console.error(
                        error instanceof Error
                            ? error.message
                            : "An unknown error occurred"
                    )
                } finally {
                    loading.value = false
                }
            }

            function setSearch(newSearch: string) {
                search.value = newSearch
                fetch()
                saveSearchQueryParam()
            }

            function setFilters({
                prop,
                value
            }: {
                prop: string
                value: string[]
            }) {
                if (value.length === 0) {
                    delete filtersValues.value[prop]
                } else {
                    filtersValues.value[prop] = value
                }
                saveSearchQueryParam()
            }

            function removeFilters() {
                filtersValues.value = {}
                saveSearchQueryParam()
            }

            function setSortBy(value: string) {
                sortBy.value = value
                // Re-sort in place, then reassign to trigger reactivity.
                sortItems()
                items.value = [...items.value]
                saveSearchQueryParam()
            }

            function reset() {
                items.value = []
                rawItems.value = []
                itemsCount.value = 0
            }

            function saveSearchQueryParam() {
                const query: Record<string, string | string[]> = {}

                Object.entries(route.query).forEach(([key, value]) => {
                    if (value !== null && value !== undefined) {
                        if (Array.isArray(value)) {
                            query[key] = value.filter(
                                (v) => v !== null
                            ) as string[]
                        } else if (typeof value === "string") {
                            query[key] = value
                        }
                    }
                })

                if (search.value.length) query.q = search.value
                else delete query.q

                if (sortBy.value) query.sort = sortBy.value
                else delete query.sort

                // Add filters to query params
                Object.entries(filtersValues.value).forEach(([key, values]) => {
                    if (values.length) query[key] = values
                    else delete query[key]
                })

                router.push({ query })
            }

            onMounted(() => {
                filtersValues.value = {}
                search.value = ""
                sortBy.value = ""

                // Restore search and filters from current route
                const searchQuery =
                    typeof route.query.q === "string" ? route.query.q : ""
                search.value = searchQuery

                // Restore sort from URL
                const sortQuery =
                    typeof route.query.sort === "string" ? route.query.sort : ""
                if (sortQuery === "price-asc" || sortQuery === "price-desc") {
                    sortBy.value = sortQuery
                }

                // Restore filters from URL
                Object.entries(route.query).forEach(([key, value]) => {
                    if (
                        key !== "q" &&
                        key !== "itemId" &&
                        key !== "sort" &&
                        key !== "video" &&
                        value
                    ) {
                        if (typeof value === "string") {
                            filtersValues.value[key] = value.includes(",")
                                ? value.split(",")
                                : [value]
                        } else if (Array.isArray(value)) {
                            filtersValues.value[key] = value as string[]
                        }
                    }
                })

                fetch()
            })

            onUnmounted(() => {
                // `_s` is Pinia's internal registry of active stores; it isn't
                // part of the public type, so narrow it explicitly.
                const pinia = getActivePinia() as
                    | (Pinia & {
                          _s?: Map<
                              string,
                              { $id: string; $dispose: () => void }
                          >
                      })
                    | undefined
                pinia?._s?.forEach((store) => {
                    if (store.$id === `list/${id}`) {
                        store.$dispose()
                        setSearch("")
                    }
                })
                // For some reason, the query is not being removed when the store is disposed
                router.push({ query: {} })
            })

            return {
                items,
                itemsCount,
                search,
                sortBy,
                loading,
                filters,
                filtersValues,

                fetch,
                applyPriceFilter,
                setSearch,
                setSortBy,
                setFilters,
                removeFilters
            }
        })
