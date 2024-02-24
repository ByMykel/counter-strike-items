<template>
    <ItemsList
        :items="skinsListStore.items"
        :items-count="skinsListStore.items.length"
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
import SkinService from "../services/SkinService"
import ItemsList from "../components/ItemsList.vue"

const { fetchPrices } = usePricesStore()
const itemDetailStore = useItemDetailStore()
const skinsListStore = createListStore({
    query: new SkinService().query
})("skins")()

skinsListStore.fetch()
fetchPrices()
</script>
