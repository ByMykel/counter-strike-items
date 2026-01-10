<template>
    <BaseItemListView
        :query="query"
        store-id="collections"
        title="Collections - Counter-Strike items"
    />
</template>

<script setup lang="ts">
import BaseItemListView from "../components/BaseItemListView.vue"
import CollectionsService from "../services/CollectionsService"

const query = new CollectionsService().query
</script>
