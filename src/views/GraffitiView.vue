<template>
    <BaseItemListView
        :query="query"
        store-id="graffiti"
        title="Graffiti - Counter-Strike items"
    />
</template>

<script setup lang="ts">
import BaseItemListView from "../components/BaseItemListView.vue"
import GraffitiService from "../services/GraffitiService"

const query = new GraffitiService().query
</script>
