<template>
    <BaseItemListView
        :query="query"
        store-id="pets"
        title="Pets - Counter-Strike items"
    />
</template>

<script setup lang="ts">
import BaseItemListView from "../components/BaseItemListView.vue"
import PetsService from "../services/PetsService"

const query = new PetsService().query
</script>
