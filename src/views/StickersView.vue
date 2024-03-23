<template>
    <div class="flex flex-row flex-1">
        <ItemsList
            :items="stickersListStore.items"
            :items-count="stickersListStore.itemsCount"
            :loading="stickersListStore.loading"
            :search="stickersListStore.search"
            :has-filters="stickersListStore.filters.length > 0"
            @set-query="stickersListStore.setSearch($event)"
            @select="selectItem"
            @load-more="stickersListStore.loadMore()"
            @open-filters="openFilters()"
        />
        <FiltersPanel
            v-if="showFilters"
            :filters="stickersListStore.filters"
            :filters-values="stickersListStore.filtersValues"
            @set-filters="setFilters"
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

stickersListStore.fetch()
</script>
