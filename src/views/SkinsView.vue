<template>
    <div class="flex flex-row flex-1">
        <ItemsList
            :items="skinsListStore.items"
            :items-count="skinsListStore.itemsCount"
            :loading="skinsListStore.loading"
            :search="skinsListStore.search"
            :has-filters="skinsListStore.filters.length > 0"
            @set-query="skinsListStore.setSearch($event)"
            @select="selectItem"
            @load-more="skinsListStore.loadMore()"
            @open-filters="openFilters()"
        />
        <FiltersPanel
            v-if="showFilters"
            :filters="skinsListStore.filters"
            :filters-values="skinsListStore.filtersValues"
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
import SkinService from "../services/SkinService"
import ItemsList from "../components/ItemsList.vue"
import FiltersPanel from "../components/FiltersPanel.vue"

const itemDetailStore = useItemDetailStore()
const skinsListStore = createListStore({
    query: new SkinService().query
})("skins")()

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
    skinsListStore.setFilters({ prop, value })
    skinsListStore.fetch()
}

function removeFilters() {
    skinsListStore.removeFilters()
    skinsListStore.fetch()
}
</script>
