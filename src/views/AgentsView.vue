<template>
    <div class="flex flex-row flex-1">
        <ItemsList
            :items="agentsListStore.items"
            :items-count="agentsListStore.itemsCount"
            :loading="agentsListStore.loading"
            :search="agentsListStore.search"
            :has-filters="agentsListStore.filters.length > 0"
            :has-selected-filters="
                Object.keys(agentsListStore.filtersValues).length > 0
            "
            :filters="agentsListStore.filters"
            :filters-values="agentsListStore.filtersValues"
            @set-query="agentsListStore.setSearch($event)"
            @select="selectItem"
            @load-more="agentsListStore.loadMore()"
            @open-filters="openFilters()"
            @remove-filter="removeFilter"
        />
        <FiltersPanel
            v-if="showFilters"
            :filters="agentsListStore.filters"
            :filters-values="agentsListStore.filtersValues"
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
import AgentsService from "../services/AgentsService"
import ItemsList from "../components/ItemsList.vue"
import FiltersPanel from "../components/FiltersPanel.vue"
import { useTitle } from "../composable/useTitle"

const itemDetailStore = useItemDetailStore()
const agentsListStore = createListStore({
    query: new AgentsService().query
})("agents")()

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
    agentsListStore.setFilters({ prop, value })
    agentsListStore.fetch()
}

function removeFilters() {
    agentsListStore.removeFilters()
    agentsListStore.fetch()
}

function removeFilter({ prop, value }: { prop: string; value: string }) {
    const currentValues = agentsListStore.filtersValues[prop] ?? []
    const newValues = currentValues.filter((v) => v !== value)
    agentsListStore.setFilters({ prop, value: newValues })
    agentsListStore.fetch()
}

useTitle("Agents - Counter-Strike items")
</script>
