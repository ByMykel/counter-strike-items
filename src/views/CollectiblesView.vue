<template>
    <ItemsList
        :items="collectiblesListStore.items"
        :items-count="collectiblesListStore.itemsCount"
        :loading="collectiblesListStore.loading"
        :search="collectiblesListStore.search"
        @set-query="collectiblesListStore.setSearch($event)"
        @select="itemDetailStore.getItemDetails($event)"
        @load-more="collectiblesListStore.loadMore()"
    />
</template>

<script setup lang="ts">
import { createListStore } from "../stores/list"
import { useItemDetailStore } from "../stores/ItemDetail"
import CollectiblesService from "../services/CollectiblesService"
import ItemsList from "../components/ItemsList.vue"

const itemDetailStore = useItemDetailStore()
const collectiblesListStore = createListStore({
    query: new CollectiblesService().query
})("collectibles")()

collectiblesListStore.fetch()
</script>
