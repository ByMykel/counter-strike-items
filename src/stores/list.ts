import { ref } from "vue"
import { defineStore } from "pinia"

// eslint-disable-next-line no-unused-vars
type QueryFunction = (search: string) => Promise<{ items: any[] }>

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

            async function fetch() {
                loading.value = true
                page.value = 1
                try {
                    const { items: newItems } = await query(search.value)
                    allItems.value = newItems
                    itemsCount.value = allItems.value.length
                    items.value = allItems.value.slice(
                        (page.value - 1) * 20,
                        page.value * 20
                    )
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

            return {
                items,
                itemsCount,
                search,
                loading,

                fetch,
                loadMore,
                setSearch
            }
        })
