<template>
    <ItemsList
        :items="keysListStore.items"
        :items-count="keysListStore.itemsCount"
        :loading="keysListStore.loading"
        :search="keysListStore.search"
        @set-query="keysListStore.setSearch($event)"
        @select="itemDetailStore.getItemDetails($event)"
        @load-more="keysListStore.loadMore()"
    />
</template>

<script setup lang="ts">
import { createListStore } from "../stores/list"
import { useItemDetailStore } from "../stores/ItemDetail"
import KeysService from "../services/KeysService"
import ItemsList from "../components/ItemsList.vue"

const itemDetailStore = useItemDetailStore()
const keysListStore = createListStore({
    query: new KeysService().query
})("keys")()

keysListStore.fetch()
</script>
