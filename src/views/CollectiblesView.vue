<template>
    <div class="flex flex-row flex-1">
        <ItemsList
            :items="collectiblesListStore.items"
            :items-count="collectiblesListStore.itemsCount"
            :loading="collectiblesListStore.loading"
            :search="collectiblesListStore.search"
            :has-filters="collectiblesListStore.filters.length > 0"
            :has-selected-filters="
                Object.keys(collectiblesListStore.filtersValues).length > 0
            "
            :filters="collectiblesListStore.filters"
            :filters-values="collectiblesListStore.filtersValues"
            @set-query="collectiblesListStore.setSearch($event)"
            @select="selectItem"
            @load-more="collectiblesListStore.loadMore()"
            @open-filters="openFilters()"
            @remove-filter="removeFilter"
        />
        <FiltersPanel
            v-if="showFilters"
            :filters="collectiblesListStore.filters"
            :filters-values="collectiblesListStore.filtersValues"
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
import CollectiblesService from "../services/CollectiblesService"
import ItemsList from "../components/ItemsList.vue"
import FiltersPanel from "../components/FiltersPanel.vue"
import { useTitle } from "../composable/useTitle"
const itemDetailStore = useItemDetailStore()
const collectiblesListStore = createListStore({
    query: new CollectiblesService().query
})("collectibles")()

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
    collectiblesListStore.setFilters({ prop, value })
    collectiblesListStore.fetch()
}

function removeFilters() {
    collectiblesListStore.removeFilters()
    collectiblesListStore.fetch()
}

function removeFilter({ prop, value }: { prop: string; value: string }) {
    const currentValues = collectiblesListStore.filtersValues[prop] ?? []
    const newValues = currentValues.filter((v) => v !== value)
    collectiblesListStore.setFilters({ prop, value: newValues })
    collectiblesListStore.fetch()
}

useTitle("Collectibles - Counter-Strike items")
</script>
