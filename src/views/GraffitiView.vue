<template>
    <div class="flex flex-row flex-1">
        <ItemsList
            :items="graffitiListStore.items"
            :items-count="graffitiListStore.itemsCount"
            :loading="graffitiListStore.loading"
            :search="graffitiListStore.search"
            :has-filters="graffitiListStore.filters.length > 0"
            :has-selected-filters="
                Object.keys(graffitiListStore.filtersValues).length > 0
            "
            :filters="graffitiListStore.filters"
            :filters-values="graffitiListStore.filtersValues"
            @set-query="graffitiListStore.setSearch($event)"
            @select="selectItem"
            @load-more="graffitiListStore.loadMore()"
            @open-filters="openFilters()"
            @remove-filter="removeFilter"
        />
        <FiltersPanel
            v-if="showFilters"
            :filters="graffitiListStore.filters"
            :filters-values="graffitiListStore.filtersValues"
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
import GraffitiService from "../services/GraffitiService"
import ItemsList from "../components/ItemsList.vue"
import FiltersPanel from "../components/FiltersPanel.vue"
import { useTitle } from "../composable/useTitle"
const itemDetailStore = useItemDetailStore()
const graffitiListStore = createListStore({
    query: new GraffitiService().query
})("graffiti")()

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
    graffitiListStore.setFilters({ prop, value })
    graffitiListStore.fetch()
}

function removeFilters() {
    graffitiListStore.removeFilters()
    graffitiListStore.fetch()
}

function removeFilter({ prop, value }: { prop: string; value: string }) {
    const currentValues = graffitiListStore.filtersValues[prop] ?? []
    const newValues = currentValues.filter((v) => v !== value)
    graffitiListStore.setFilters({ prop, value: newValues })
    graffitiListStore.fetch()
}

useTitle("Graffiti - Counter-Strike items")
</script>
