import { onUnmounted, onMounted, ref } from "vue"
import { defineStore, getActivePinia } from "pinia"
import { useRoute, useRouter } from "vue-router"
import { Filter } from "../types"

type QueryFunction = ({
    // eslint-disable-next-line no-unused-vars
    search,
    // eslint-disable-next-line no-unused-vars
    filters
}: {
    search: string
    filters: { [prop: string]: string[] }
}) => Promise<{
    items: any[]
    filters?: Filter[]
}>

export const createListStore =
    ({ query }: { query: QueryFunction }) =>
    (id: string) =>
        defineStore(`list/${id}`, () => {
            const route = useRoute()
            const router = useRouter()

            const loading = ref<boolean>(false)
            const search = ref<string>("")
            const page = ref<number>(1)
            const allItems = ref<any[]>([])
            const items = ref<any[]>([])
            const itemsCount = ref<number>(0)
            const filters = ref<Filter[]>([])
            const filtersValues = ref<{ [prop: string]: string[] }>({})

            async function fetch() {
                reset()
                loading.value = true
                page.value = 1
                try {
                    const { items: newItems, filters: newFilters } =
                        await query({
                            search: search.value,
                            filters: filtersValues.value
                        })
                    allItems.value = newItems
                    itemsCount.value = allItems.value.length
                    items.value = allItems.value.slice(
                        (page.value - 1) * 20,
                        page.value * 20
                    )
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

            async function loadMore() {
                page.value += 1
                items.value.push(
                    ...allItems.value.slice(
                        (page.value - 1) * 20,
                        page.value * 20
                    )
                )
            }

            function setSearch(newSearch: string) {
                reset()
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

            function reset() {
                items.value = []
                allItems.value = []
                itemsCount.value = 0
            }

            function saveSearchQueryParam() {
                const query: Record<string, string | string[]> = {}
                if (search.value.length) query.q = search.value

                // Add filters to query params
                Object.entries(filtersValues.value).forEach(([key, values]) => {
                    if (values.length) query[key] = values
                })

                router.push({ query })
            }

            onMounted(() => {
                filtersValues.value = {}
                search.value = ""

                // Restore search and filters from current route
                const searchQuery =
                    typeof route.query.q === "string" ? route.query.q : ""
                search.value = searchQuery

                // Restore filters from URL
                Object.entries(route.query).forEach(([key, value]) => {
                    if (key !== "q" && value) {
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
                // TODO: find solution to ` Property '_s' does not exist on type 'Pinia'.ts(2339) `
                // @ts-ignore
                getActivePinia()?._s?.forEach((store: any) => {
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
                loading,
                filters,
                filtersValues,

                fetch,
                loadMore,
                setSearch,
                setFilters,
                removeFilters
            }
        })
