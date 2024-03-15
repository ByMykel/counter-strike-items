import { ref } from "vue"
import { defineStore } from "pinia"

type Filter = {
    prop: string
    name: string
    type: string
    options: { id: string; name: string }[]
}

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
    filters: Filter[]
}>

export const createListStore =
    ({ query }: { query: QueryFunction }) =>
    (id: string) =>
        defineStore(`list/${id}`, () => {
            const loading = ref<boolean>(false)
            const search = ref<string>("")
            const page = ref<number>(1)
            const allItems = ref<any[]>([])
            const items = ref<any[]>([])
            const itemsCount = ref<number>(0)
            const filters = ref<Filter[]>([])
            const filtersValues = ref<{ [prop: string]: string[] }>({})

            async function fetch() {
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
                    filters.value = newFilters
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
                items.value = []
                allItems.value = []
                itemsCount.value = 0
                search.value = newSearch
                fetch()
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
            }

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
                setFilters
            }
        })
