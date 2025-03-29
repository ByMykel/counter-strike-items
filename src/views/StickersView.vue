<template>
    <div class="flex flex-row flex-1">
        <ItemsList
            :items="stickersListStore.items"
            :items-count="stickersListStore.itemsCount"
            :loading="stickersListStore.loading"
            :search="stickersListStore.search"
            :has-filters="stickersListStore.filters.length > 0"
            :has-selected-filters="
                Object.keys(stickersListStore.filtersValues).length > 0
            "
            :filters="stickersListStore.filters"
            :filters-values="stickersListStore.filtersValues"
            @set-query="stickersListStore.setSearch($event)"
            @select="selectItem"
            @load-more="stickersListStore.loadMore()"
            @open-filters="openFilters()"
            @remove-filter="removeFilter"
        />
        <FiltersPanel
            v-if="showFilters"
            :filters="stickersListStore.filters"
            :filters-values="stickersListStore.filtersValues"
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
import StickersService from "../services/StickersService"
import ItemsList from "../components/ItemsList.vue"
import FiltersPanel from "../components/FiltersPanel.vue"
import { useTitle } from "../composable/useTitle"
const itemDetailStore = useItemDetailStore()
const stickersListStore = createListStore({
    query: new StickersService().query
})("stickers")()

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
    stickersListStore.setFilters({ prop, value })
    stickersListStore.fetch()
}

function removeFilters() {
    stickersListStore.removeFilters()
    stickersListStore.fetch()
}

function removeFilter({ prop, value }: { prop: string; value: string }) {
    const currentValues = stickersListStore.filtersValues[prop] ?? []
    const newValues = currentValues.filter((v) => v !== value)
    stickersListStore.setFilters({ prop, value: newValues })
    stickersListStore.fetch()
}

useTitle("Stickers - Counter-Strike items")
</script>
