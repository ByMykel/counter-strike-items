<template>
    <div class="flex flex-row flex-1">
        <ItemsList
            :items="view.items.value"
            :items-count="view.itemsCount.value"
            :loading="view.loading.value"
            :search="view.search.value"
            :has-filters="view.hasFilters.value"
            :has-selected-filters="view.hasSelectedFilters.value"
            :filters="view.filters.value"
            :filters-values="view.filtersValues.value"
            :is-video="isVideo"
            :sort-by="view.sortBy.value"
            @set-sort-by="view.setSortBy($event)"
            @set-query="view.setSearch($event)"
            @select="view.selectItem"
            @load-more="view.loadMore()"
            @open-filters="view.openFilters()"
            @remove-filter="view.removeFilter"
        />
        <FiltersPanel
            v-if="view.showFilters.value"
            :filters="view.filters.value"
            :filters-values="view.filtersValues.value"
            @set-filters="view.setFilters"
            @remove-filters="view.removeFilters"
            @close="view.closeFilters()"
        />
    </div>
</template>

<script setup lang="ts">
import ItemsList from "./ItemsList.vue"
import FiltersPanel from "./FiltersPanel.vue"
import { useItemListView } from "../composables/useItemListView"
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

interface Props {
    query: QueryFunction
    storeId: string
    title: string
    filterTransform?: (filters: Filter[]) => Filter[]
    isVideo?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    filterTransform: undefined,
    isVideo: false
})

const view = useItemListView({
    query: props.query,
    storeId: props.storeId,
    title: props.title,
    filterTransform: props.filterTransform
})
</script>
