<template>
    <ItemsList
        :items="stickersListStore.items"
        :items-count="stickersListStore.itemsCount"
        :loading="stickersListStore.loading"
        :search="stickersListStore.search"
        @set-query="stickersListStore.setSearch($event)"
        @select="itemDetailStore.getItemDetails($event)"
        @load-more="stickersListStore.loadMore()"
    />
</template>

<script setup lang="ts">
import { createListStore } from "../stores/list"
import { useItemDetailStore } from "../stores/ItemDetail"
import StickersService from "../services/StickersService"
import ItemsList from "../components/ItemsList.vue"

const itemDetailStore = useItemDetailStore()
const stickersListStore = createListStore({
    query: new StickersService().query
})("stickers")()

stickersListStore.fetch()
</script>
