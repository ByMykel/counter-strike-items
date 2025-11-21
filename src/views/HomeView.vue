<template>
    <div class="flex flex-row flex-1">
        <ItemsList
            :items="itemsListStore.items"
            :items-count="itemsListStore.itemsCount"
            :loading="itemsListStore.loading"
            :search="itemsListStore.search"
            :has-filters="visibleFilters.length > 0"
            :has-selected-filters="
                Object.keys(itemsListStore.filtersValues).length > 0
            "
            :filters="visibleFilters"
            :filters-values="itemsListStore.filtersValues"
            @set-query="itemsListStore.setSearch($event)"
            @select="selectItem"
            @load-more="itemsListStore.loadMore()"
            @open-filters="openFilters()"
            @remove-filter="removeFilter"
        />
        <FiltersPanel
            v-if="showFilters"
            :filters="visibleFilters"
            :filters-values="itemsListStore.filtersValues"
            @set-filters="setFilters"
            @remove-filters="removeFilters"
            @close="showFilters = false"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"

import { createListStore } from "../stores/list"
import { useItemDetailStore } from "../stores/ItemDetail"
import HomeService from "../services/HomeService"
import ItemsList from "../components/ItemsList.vue"
import FiltersPanel from "../components/FiltersPanel.vue"
import { useTitle } from "../composable/useTitle"
import { useDebug } from "../composables/useDebug"

const itemDetailStore = useItemDetailStore()
const itemsListStore = createListStore({
    query: new HomeService().query
})("home")()

const { isDebugMode } = useDebug()
const showFilters = ref<boolean>(false)

// Filter out CDN filter when not in debug mode
const visibleFilters = computed(() => {
    if (isDebugMode.value) {
        return itemsListStore.filters
    }
    return itemsListStore.filters.filter(
        (filter) => filter.prop !== "image_domain"
    )
})

function openFilters() {
    itemDetailStore.deleteItem()
    showFilters.value = true
}

function selectItem(id: string) {
    showFilters.value = false
    itemDetailStore.getItemDetails(id)
}

function setFilters({ prop, value }: { prop: string; value: string[] }) {
    itemsListStore.setFilters({ prop, value })
    itemsListStore.fetch()
}

function removeFilters() {
    itemsListStore.removeFilters()
    itemsListStore.fetch()
}

function removeFilter({ prop, value }: { prop: string; value: string }) {
    const currentValues = itemsListStore.filtersValues[prop] ?? []
    const newValues = currentValues.filter((v) => v !== value)
    itemsListStore.setFilters({ prop, value: newValues })
    itemsListStore.fetch()
}

useTitle("All - Counter-Strike items")
</script>
