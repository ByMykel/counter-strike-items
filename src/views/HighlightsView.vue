<template>
    <div class="flex flex-row flex-1">
        <ItemsList
            :items="highlightsListStore.items"
            :items-count="highlightsListStore.itemsCount"
            :loading="highlightsListStore.loading"
            :search="highlightsListStore.search"
            :has-filters="highlightsListStore.filters.length > 0"
            :has-selected-filters="
                Object.keys(highlightsListStore.filtersValues).length > 0
            "
            :filters="highlightsListStore.filters"
            :filters-values="highlightsListStore.filtersValues"
            is-video
            @set-query="highlightsListStore.setSearch($event)"
            @select="selectItem"
            @load-more="highlightsListStore.loadMore()"
            @open-filters="openFilters()"
            @remove-filter="removeFilter"
        />
        <FiltersPanel
            v-if="showFilters"
            :filters="highlightsListStore.filters"
            :filters-values="highlightsListStore.filtersValues"
            @set-filters="setFilters"
            @remove-filters="removeFilters"
            @close="showFilters = false"
        />
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

import { createListStore } from "../stores/list"
import { useItemDetailStore } from "../stores/ItemDetail"
import HighlightsService from "../services/HighlightsService"
import ItemsList from "../components/ItemsList.vue"
import FiltersPanel from "../components/FiltersPanel.vue"
import { useTitle } from "../composable/useTitle"
const itemDetailStore = useItemDetailStore()
const highlightsListStore = createListStore({
    query: new HighlightsService().query
})("highlights")()

const showFilters = ref<boolean>(false)

function openFilters() {
    itemDetailStore.deleteItem()
    showFilters.value = true
}

function selectItem(id: string) {
    showFilters.value = false
    itemDetailStore.getItemDetails(id)
}

function setFilters({ prop, value }: { prop: string; value: string[] }) {
    highlightsListStore.setFilters({ prop, value })
    highlightsListStore.fetch()
}

function removeFilters() {
    highlightsListStore.removeFilters()
    highlightsListStore.fetch()
}

function removeFilter({ prop, value }: { prop: string; value: string }) {
    const currentValues = highlightsListStore.filtersValues[prop] ?? []
    const newValues = currentValues.filter((v) => v !== value)
    highlightsListStore.setFilters({ prop, value: newValues })
    highlightsListStore.fetch()
}

useTitle("Highlights - Counter-Strike items")
</script>
