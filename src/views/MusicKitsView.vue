<template>
    <div class="flex flex-row flex-1">
        <ItemsList
            :items="musicKitsListStore.items"
            :items-count="musicKitsListStore.itemsCount"
            :loading="musicKitsListStore.loading"
            :search="musicKitsListStore.search"
            :has-filters="musicKitsListStore.filters.length > 0"
            @set-query="musicKitsListStore.setSearch($event)"
            @select="selectItem"
            @load-more="musicKitsListStore.loadMore()"
            @open-filters="openFilters()"
        />
        <FiltersPanel
            v-if="showFilters"
            :filters="musicKitsListStore.filters"
            :filters-values="musicKitsListStore.filtersValues"
            @set-filters="setFilters"
            @close="showFilters = false"
        />
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

import { createListStore } from "../stores/list"
import { useItemDetailStore } from "../stores/ItemDetail"
import MusicKitsService from "../services/MusicKitsService"
import ItemsList from "../components/ItemsList.vue"
import FiltersPanel from "../components/FiltersPanel.vue"

const itemDetailStore = useItemDetailStore()
const musicKitsListStore = createListStore({
    query: new MusicKitsService().query
})("music-kits")()

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
    musicKitsListStore.setFilters({ prop, value })
    musicKitsListStore.fetch()
}

musicKitsListStore.fetch()
</script>
