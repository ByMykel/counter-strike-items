<template>
    <ItemsList
        :items="patchesListStore.items"
        :items-count="patchesListStore.itemsCount"
        :loading="patchesListStore.loading"
        :search="patchesListStore.search"
        @set-query="patchesListStore.setSearch($event)"
        @select="itemDetailStore.getItemDetails($event)"
        @load-more="patchesListStore.loadMore()"
    />
</template>

<script setup lang="ts">
import { createListStore } from "../stores/list"
import { useItemDetailStore } from "../stores/ItemDetail"
import PatchesService from "../services/PatchesService"
import ItemsList from "../components/ItemsList.vue"

const itemDetailStore = useItemDetailStore()
const patchesListStore = createListStore({
    query: new PatchesService().query
})("patches")()

patchesListStore.fetch()
</script>
