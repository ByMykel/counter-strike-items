<template>
    <div class="flex flex-row flex-1">
        <ItemsList
            :items="keychainListStore.items"
            :items-count="keychainListStore.itemsCount"
            :loading="keychainListStore.loading"
            :search="keychainListStore.search"
            :has-filters="keychainListStore.filters.length > 0"
            :has-selected-filters="
                Object.keys(keychainListStore.filtersValues).length > 0
            "
            :filters="keychainListStore.filters"
            :filters-values="keychainListStore.filtersValues"
            @set-query="keychainListStore.setSearch($event)"
            @select="selectItem"
            @load-more="keychainListStore.loadMore()"
            @open-filters="openFilters()"
            @remove-filter="removeFilter"
        />
        <FiltersPanel
            v-if="showFilters"
            :filters="keychainListStore.filters"
            :filters-values="keychainListStore.filtersValues"
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
import KeychainsService from "../services/KeychainsService"
import ItemsList from "../components/ItemsList.vue"
import FiltersPanel from "../components/FiltersPanel.vue"
import { useTitle } from "../composable/useTitle"

const itemDetailStore = useItemDetailStore()
const keychainListStore = createListStore({
    query: new KeychainsService().query
})("keychain")()

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
    keychainListStore.setFilters({ prop, value })
    keychainListStore.fetch()
}

function removeFilters() {
    keychainListStore.removeFilters()
    keychainListStore.fetch()
}

function removeFilter({ prop, value }: { prop: string; value: string }) {
    const currentValues = keychainListStore.filtersValues[prop] ?? []
    const newValues = currentValues.filter((v) => v !== value)
    keychainListStore.setFilters({ prop, value: newValues })
    keychainListStore.fetch()
}

useTitle("Keychains - Counter-Strike items")
</script>
