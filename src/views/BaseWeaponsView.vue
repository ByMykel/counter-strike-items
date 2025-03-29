<template>
    <div class="flex flex-row flex-1">
        <ItemsList
            :items="baseWeaponsListStore.items"
            :items-count="baseWeaponsListStore.itemsCount"
            :loading="baseWeaponsListStore.loading"
            :search="baseWeaponsListStore.search"
            :has-filters="baseWeaponsListStore.filters.length > 0"
            :has-selected-filters="
                Object.keys(baseWeaponsListStore.filtersValues).length > 0
            "
            :filters="baseWeaponsListStore.filters"
            :filters-values="baseWeaponsListStore.filtersValues"
            @set-query="baseWeaponsListStore.setSearch($event)"
            @select="selectItem"
            @load-more="baseWeaponsListStore.loadMore()"
            @open-filters="openFilters()"
            @remove-filter="removeFilter"
        />
        <FiltersPanel
            v-if="showFilters"
            :filters="baseWeaponsListStore.filters"
            :filters-values="baseWeaponsListStore.filtersValues"
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
import BaseWeaponsService from "../services/BaseWeaponsService"
import ItemsList from "../components/ItemsList.vue"
import FiltersPanel from "../components/FiltersPanel.vue"
import { useTitle } from "../composable/useTitle"
const itemDetailStore = useItemDetailStore()
const baseWeaponsListStore = createListStore({
    query: new BaseWeaponsService().query
})("base-weapons")()

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
    baseWeaponsListStore.setFilters({ prop, value })
    baseWeaponsListStore.fetch()
}

function removeFilters() {
    baseWeaponsListStore.removeFilters()
    baseWeaponsListStore.fetch()
}

function removeFilter({ prop, value }: { prop: string; value: string }) {
    const currentValues = baseWeaponsListStore.filtersValues[prop] ?? []
    const newValues = currentValues.filter((v) => v !== value)
    baseWeaponsListStore.setFilters({ prop, value: newValues })
    baseWeaponsListStore.fetch()
}

useTitle("Base weapons - Counter-Strike items")
</script>
