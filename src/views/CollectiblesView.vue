<template>
    <BaseItemListView
        :query="query"
        store-id="collectibles"
        title="Collectibles - Counter-Strike items"
    />
</template>

<script setup lang="ts">
import BaseItemListView from "../components/BaseItemListView.vue"
import CollectiblesService from "../services/CollectiblesService"

const query = new CollectiblesService().query
</script>
