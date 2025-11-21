<template>
    <div class="flex flex-row flex-1">
        <ItemsList
            :items="stickerSlabsListStore.items"
            :items-count="stickerSlabsListStore.itemsCount"
            :loading="stickerSlabsListStore.loading"
            :search="stickerSlabsListStore.search"
            :has-filters="stickerSlabsListStore.filters.length > 0"
            :has-selected-filters="
                Object.keys(stickerSlabsListStore.filtersValues).length > 0
            "
            :filters="stickerSlabsListStore.filters"
            :filters-values="stickerSlabsListStore.filtersValues"
            @set-query="stickerSlabsListStore.setSearch($event)"
            @select="selectItem"
            @load-more="stickerSlabsListStore.loadMore()"
            @open-filters="openFilters()"
            @remove-filter="removeFilter"
        />
        <FiltersPanel
            v-if="showFilters"
            :filters="stickerSlabsListStore.filters"
            :filters-values="stickerSlabsListStore.filtersValues"
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
import StickerSlabsService from "../services/StickerSlabsService"
import ItemsList from "../components/ItemsList.vue"
import FiltersPanel from "../components/FiltersPanel.vue"
import { useTitle } from "../composable/useTitle"
const itemDetailStore = useItemDetailStore()
const stickerSlabsListStore = createListStore({
    query: new StickerSlabsService().query
})("sticker-slabs")()

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
    stickerSlabsListStore.setFilters({ prop, value })
    stickerSlabsListStore.fetch()
}

function removeFilters() {
    stickerSlabsListStore.removeFilters()
    stickerSlabsListStore.fetch()
}

function removeFilter({ prop, value }: { prop: string; value: string }) {
    const currentValues = stickerSlabsListStore.filtersValues[prop] ?? []
    const newValues = currentValues.filter((v) => v !== value)
    stickerSlabsListStore.setFilters({ prop, value: newValues })
    stickerSlabsListStore.fetch()
}

useTitle("Sticker Slabs - Counter-Strike items")
</script>
