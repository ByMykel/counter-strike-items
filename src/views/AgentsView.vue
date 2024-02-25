<template>
    <ItemsList
        :items="agentsListStore.items"
        :items-count="agentsListStore.itemsCount"
        :loading="agentsListStore.loading"
        :search="agentsListStore.search"
        @set-query="agentsListStore.setSearch($event)"
        @select="itemDetailStore.getItemDetails($event)"
        @load-more="agentsListStore.loadMore()"
    />
</template>

<script setup lang="ts">
import { createListStore } from "../stores/list"
import { useItemDetailStore } from "../stores/ItemDetail"
import AgentsService from "../services/AgentsService"
import ItemsList from "../components/ItemsList.vue"

const itemDetailStore = useItemDetailStore()
const agentsListStore = createListStore({
    query: new AgentsService().query
})("agents")()

agentsListStore.fetch()
</script>
