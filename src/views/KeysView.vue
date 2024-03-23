<template>
    <div class="flex flex-row flex-1">
        <ItemsList
            :items="keysListStore.items"
            :items-count="keysListStore.itemsCount"
            :loading="keysListStore.loading"
            :search="keysListStore.search"
            :has-filters="keysListStore.filters.length > 0"
            @set-query="keysListStore.setSearch($event)"
            @select="selectItem"
            @load-more="keysListStore.loadMore()"
            @open-filters="openFilters()"
        />
        <FiltersPanel
            v-if="showFilters"
            :filters="keysListStore.filters"
            :filters-values="keysListStore.filtersValues"
            @set-filters="setFilters"
            @close="showFilters = false"
        />
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

import { createListStore } from "../stores/list"
import { useItemDetailStore } from "../stores/ItemDetail"
import KeysService from "../services/KeysService"
import ItemsList from "../components/ItemsList.vue"
import FiltersPanel from "../components/FiltersPanel.vue"

const itemDetailStore = useItemDetailStore()
const keysListStore = createListStore({
    query: new KeysService().query
})("keys")()

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
    keysListStore.setFilters({ prop, value })
    keysListStore.fetch()
}

keysListStore.fetch()
</script>
