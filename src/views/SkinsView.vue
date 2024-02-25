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
import { useItemDetailStore } from "../stores/ItemDetail"
import SkinService from "../services/SkinService"
import ItemsList from "../components/ItemsList.vue"

const itemDetailStore = useItemDetailStore()
const skinsListStore = createListStore({
    query: new SkinService().query
})("skins")()

skinsListStore.fetch()
</script>
