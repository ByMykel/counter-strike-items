<template>
    <BaseItemListView
        :query="query"
        store-id="crates"
        title="Crates - Counter-Strike items"
    />
</template>

<script setup lang="ts">
import BaseItemListView from "../components/BaseItemListView.vue"
import CratesService from "../services/CratesService"

const query = new CratesService().query
</script>
