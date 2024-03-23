<template>
    <div class="flex flex-row flex-1">
        <ItemsList
            :items="collectionsListStore.items"
            :items-count="collectionsListStore.itemsCount"
            :loading="collectionsListStore.loading"
            :search="collectionsListStore.search"
            :has-filters="collectionsListStore.filters.length > 0"
            @set-query="collectionsListStore.setSearch($event)"
            @select="selectItem"
            @load-more="collectionsListStore.loadMore()"
            @open-filters="openFilters()"
        />
        <FiltersPanel
            v-if="showFilters"
            :filters="collectionsListStore.filters"
            :filters-values="collectionsListStore.filtersValues"
            @set-filters="setFilters"
            @close="showFilters = false"
        />
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

import { createListStore } from "../stores/list"
import { useItemDetailStore } from "../stores/ItemDetail"
import CollectionsService from "../services/CollectionsService"
import ItemsList from "../components/ItemsList.vue"
import FiltersPanel from "../components/FiltersPanel.vue"

const itemDetailStore = useItemDetailStore()
const collectionsListStore = createListStore({
    query: new CollectionsService().query
})("collections")()

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
    collectionsListStore.setFilters({ prop, value })
    collectionsListStore.fetch()
}
</script>
