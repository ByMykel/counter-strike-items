<template>
    <BaseItemListView
        :query="query"
        store-id="stickers"
        title="Stickers - Counter-Strike items"
    />
</template>

<script setup lang="ts">
import BaseItemListView from "../components/BaseItemListView.vue"
import StickersService from "../services/StickersService"

const query = new StickersService().query
</script>
