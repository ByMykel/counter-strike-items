<template>
    <ItemsList
        :items="graffitiListStore.items"
        :items-count="graffitiListStore.itemsCount"
        :loading="graffitiListStore.loading"
        :search="graffitiListStore.search"
        @set-query="graffitiListStore.setSearch($event)"
        @select="itemDetailStore.getItemDetails($event)"
        @load-more="graffitiListStore.loadMore()"
    />
</template>

<script setup lang="ts">
import { createListStore } from "../stores/list"
import { useItemDetailStore } from "../stores/ItemDetail"
import GraffitiService from "../services/GraffitiService"
import ItemsList from "../components/ItemsList.vue"

const itemDetailStore = useItemDetailStore()
const graffitiListStore = createListStore({
    query: new GraffitiService().query
})("graffiti")()

graffitiListStore.fetch()
</script>
