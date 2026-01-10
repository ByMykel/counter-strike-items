<template>
    <BaseItemListView
        :query="query"
        store-id="highlights"
        title="Highlights - Counter-Strike items"
        is-video
    />
</template>

<script setup lang="ts">
import BaseItemListView from "../components/BaseItemListView.vue"
import HighlightsService from "../services/HighlightsService"

const query = new HighlightsService().query
</script>
