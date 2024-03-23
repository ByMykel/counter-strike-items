<template>
    <div class="flex flex-row flex-1">
        <ItemsList
            :items="collectiblesListStore.items"
            :items-count="collectiblesListStore.itemsCount"
            :loading="collectiblesListStore.loading"
            :search="collectiblesListStore.search"
            :has-filters="collectiblesListStore.filters.length > 0"
            @set-query="collectiblesListStore.setSearch($event)"
            @select="selectItem"
            @load-more="collectiblesListStore.loadMore()"
            @open-filters="openFilters()"
        />
        <FiltersPanel
            v-if="showFilters"
            :filters="collectiblesListStore.filters"
            :filters-values="collectiblesListStore.filtersValues"
            @set-filters="setFilters"
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

collectiblesListStore.fetch()
</script>
