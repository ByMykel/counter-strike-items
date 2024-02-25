<template>
    <ItemsList
        :items="musicKitsListStore.items"
        :items-count="musicKitsListStore.itemsCount"
        :loading="musicKitsListStore.loading"
        :search="musicKitsListStore.search"
        @set-query="musicKitsListStore.setSearch($event)"
        @select="itemDetailStore.getItemDetails($event)"
        @load-more="musicKitsListStore.loadMore()"
    />
</template>

<script setup lang="ts">
import { createListStore } from "../stores/list"
import { useItemDetailStore } from "../stores/ItemDetail"
import MusicKitsService from "../services/MusicKitsService"
import ItemsList from "../components/ItemsList.vue"

const itemDetailStore = useItemDetailStore()
const musicKitsListStore = createListStore({
    query: new MusicKitsService().query
})("music-kits")()

musicKitsListStore.fetch()
</script>
