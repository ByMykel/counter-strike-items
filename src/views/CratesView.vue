<template>
    <div class="flex flex-row flex-1">
        <ItemsList
            :items="cratesListStore.items"
            :items-count="cratesListStore.itemsCount"
            :loading="cratesListStore.loading"
            :search="cratesListStore.search"
            :has-filters="cratesListStore.filters.length > 0"
            :has-selected-filters="
                Object.keys(cratesListStore.filtersValues).length > 0
            "
            :filters="cratesListStore.filters"
            :filters-values="cratesListStore.filtersValues"
            @set-query="cratesListStore.setSearch($event)"
            @select="selectItem"
            @load-more="cratesListStore.loadMore()"
            @open-filters="openFilters()"
            @remove-filter="removeFilter"
        />
        <FiltersPanel
            v-if="showFilters"
            :filters="cratesListStore.filters"
            :filters-values="cratesListStore.filtersValues"
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
import CratesService from "../services/CratesService"
import ItemsList from "../components/ItemsList.vue"
import FiltersPanel from "../components/FiltersPanel.vue"
import { useTitle } from "../composable/useTitle"

const itemDetailStore = useItemDetailStore()
const cratesListStore = createListStore({
    query: new CratesService().query
})("crates")()

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
    cratesListStore.setFilters({ prop, value })
    cratesListStore.fetch()
}

function removeFilters() {
    cratesListStore.removeFilters()
    cratesListStore.fetch()
}

function removeFilter({ prop, value }: { prop: string; value: string }) {
    const currentValues = cratesListStore.filtersValues[prop] ?? []
    const newValues = currentValues.filter((v) => v !== value)
    cratesListStore.setFilters({ prop, value: newValues })
    cratesListStore.fetch()
}

useTitle("Crates - Counter-Strike items")
</script>
