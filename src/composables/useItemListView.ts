import { ref, computed, ComputedRef } from "vue"
import { createListStore } from "../stores/list"
import { useItemDetailStore } from "../stores/ItemDetail"
import { useTitle } from "../composable/useTitle"
import { Filter } from "../types"

type QueryFunction = ({
    search,
    filters
}: {
    search: string
    filters: { [prop: string]: string[] }
}) => Promise<{
    items: any[]
    filters?: Filter[]
}>

interface UseItemListViewOptions {
    query: QueryFunction
    storeId: string
    title: string
    filterTransform?: (filters: Filter[]) => Filter[]
}

export function useItemListView(options: UseItemListViewOptions) {
    const { query, storeId, title, filterTransform } = options

    const itemDetailStore = useItemDetailStore()
    const listStore = createListStore({ query })(storeId)()

    const showFilters = ref<boolean>(false)

    // Apply filter transform if provided, otherwise use filters directly
    const visibleFilters: ComputedRef<Filter[]> = computed(() => {
        if (filterTransform) {
            return filterTransform(listStore.filters)
        }
        return listStore.filters
    })

    function openFilters() {
        itemDetailStore.deleteItem()
        showFilters.value = true
    }

    function closeFilters() {
        showFilters.value = false
    }

    function selectItem(id: string) {
        showFilters.value = false
        itemDetailStore.getItemDetails(id)
    }

    function setFilters({ prop, value }: { prop: string; value: string[] }) {
        listStore.setFilters({ prop, value })
        if (prop === "price_range") {
            listStore.applyPriceFilter()
        } else {
            listStore.fetch()
        }
    }

    function removeFilters() {
        listStore.removeFilters()
        listStore.fetch()
    }

    function removeFilter({ prop, value }: { prop: string; value: string }) {
        const currentValues = listStore.filtersValues[prop] ?? []
        const newValues = currentValues.filter((v) => v !== value)
        listStore.setFilters({ prop, value: newValues })
        listStore.fetch()
    }

    useTitle(title)

    return {
        // Store state
        items: computed(() => listStore.items),
        itemsCount: computed(() => listStore.itemsCount),
        loading: computed(() => listStore.loading),
        search: computed(() => listStore.search),
        filters: visibleFilters,
        filtersValues: computed(() => listStore.filtersValues),
        hasFilters: computed(() => visibleFilters.value.length > 0),
        hasSelectedFilters: computed(
            () => Object.keys(listStore.filtersValues).length > 0
        ),

        // UI state
        showFilters,

        // Sort
        sortBy: computed(() => listStore.sortBy),
        setSortBy: listStore.setSortBy,

        // Methods
        setSearch: listStore.setSearch,
        loadMore: listStore.loadMore,
        openFilters,
        closeFilters,
        selectItem,
        setFilters,
        removeFilters,
        removeFilter
    }
}
