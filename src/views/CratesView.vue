<template>
    <ItemsList
        :items="cratesListStore.items"
        :items-count="cratesListStore.itemsCount"
        :loading="cratesListStore.loading"
        :search="cratesListStore.search"
        @set-query="cratesListStore.setSearch($event)"
        @select="itemDetailStore.getItemDetails($event)"
        @load-more="cratesListStore.loadMore()"
    />
</template>

<script setup lang="ts">
import { createListStore } from "../stores/list"
import { useItemDetailStore } from "../stores/ItemDetail"
import CratesService from "../services/CratesService"
import ItemsList from "../components/ItemsList.vue"

const itemDetailStore = useItemDetailStore()
const cratesListStore = createListStore({
    query: new CratesService().query
})("crates")()

cratesListStore.fetch()
</script>
