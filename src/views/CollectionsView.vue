<template>
    <ItemsList
        :items="collectionsListStore.items"
        :items-count="collectionsListStore.itemsCount"
        :loading="collectionsListStore.loading"
        :search="collectionsListStore.search"
        @set-query="collectionsListStore.setSearch($event)"
        @select="itemDetailStore.getItemDetails($event)"
        @load-more="collectionsListStore.loadMore()"
    />
</template>

<script setup lang="ts">
import { createListStore } from "../stores/list"
import { useItemDetailStore } from "../stores/ItemDetail"
import CollectionsService from "../services/CollectionsService"
import ItemsList from "../components/ItemsList.vue"

const itemDetailStore = useItemDetailStore()
const collectionsListStore = createListStore({
    query: new CollectionsService().query
})("collections")()

collectionsListStore.fetch()
</script>
