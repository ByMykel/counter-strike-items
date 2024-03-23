<template>
    <div class="flex flex-row flex-1">
        <ItemsList
            :items="patchesListStore.items"
            :items-count="patchesListStore.itemsCount"
            :loading="patchesListStore.loading"
            :search="patchesListStore.search"
            :has-filters="patchesListStore.filters.length > 0"
            @set-query="patchesListStore.setSearch($event)"
            @select="selectItem"
            @load-more="patchesListStore.loadMore()"
            @open-filters="openFilters()"
        />
        <FiltersPanel
            v-if="showFilters"
            :filters="patchesListStore.filters"
            :filters-values="patchesListStore.filtersValues"
            @set-filters="setFilters"
            @close="showFilters = false"
        />
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

import { createListStore } from "../stores/list"
import { useItemDetailStore } from "../stores/ItemDetail"
import PatchesService from "../services/PatchesService"
import ItemsList from "../components/ItemsList.vue"
import FiltersPanel from "../components/FiltersPanel.vue"

const itemDetailStore = useItemDetailStore()
const patchesListStore = createListStore({
    query: new PatchesService().query
})("patches")()

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
    patchesListStore.setFilters({ prop, value })
    patchesListStore.fetch()
}
</script>
