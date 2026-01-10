<template>
    <BaseItemListView
        :query="query"
        store-id="patches"
        title="Patches - Counter-Strike items"
    />
</template>

<script setup lang="ts">
import BaseItemListView from "../components/BaseItemListView.vue"
import PatchesService from "../services/PatchesService"

const query = new PatchesService().query
</script>
