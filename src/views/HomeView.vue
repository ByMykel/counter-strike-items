<template>
    <ItemsList
        :items="skinsListStore.items"
        :items-count="skinsListStore.itemsCount"
        :loading="skinsListStore.loading"
        :search="skinsListStore.search"
        @set-query="skinsListStore.setSearch($event)"
        @select="itemDetailStore.getItemDetails($event)"
        @load-more="skinsListStore.loadMore()"
    />
</template>

<script setup lang="ts">
import { createListStore } from "../stores/list"
import { usePricesStore } from "../stores/prices"
import { useItemDetailStore } from "../stores/ItemDetail"
import HomeService from "../services/HomeService"
import ItemsList from "../components/ItemsList.vue"

const { fetchPrices } = usePricesStore()
const itemDetailStore = useItemDetailStore()
const skinsListStore = createListStore({
    query: new HomeService().query
})("home")()

skinsListStore.fetch()
fetchPrices()
</script>
