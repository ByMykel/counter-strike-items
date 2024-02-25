<template>
    <ItemsList
        :items="itemsListStore.items"
        :items-count="itemsListStore.itemsCount"
        :loading="itemsListStore.loading"
        :search="itemsListStore.search"
        @set-query="itemsListStore.setSearch($event)"
        @select="itemDetailStore.getItemDetails($event)"
        @load-more="itemsListStore.loadMore()"
    />
</template>

<script setup lang="ts">
import { createListStore } from "../stores/list"
import { useItemDetailStore } from "../stores/ItemDetail"
import HomeService from "../services/HomeService"
import ItemsList from "../components/ItemsList.vue"

const itemDetailStore = useItemDetailStore()
const itemsListStore = createListStore({
    query: new HomeService().query
})("home")()

itemsListStore.fetch()
</script>
