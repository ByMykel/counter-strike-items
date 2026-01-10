<template>
    <BaseItemListView
        :query="query"
        store-id="sticker-slabs"
        title="Sticker Slabs - Counter-Strike items"
    />
</template>

<script setup lang="ts">
import BaseItemListView from "../components/BaseItemListView.vue"
import StickerSlabsService from "../services/StickerSlabsService"

const query = new StickerSlabsService().query
</script>
