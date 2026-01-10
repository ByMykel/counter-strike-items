<template>
    <BaseItemListView
        :query="query"
        store-id="keychains"
        title="Keychains - Counter-Strike items"
    />
</template>

<script setup lang="ts">
import BaseItemListView from "../components/BaseItemListView.vue"
import KeychainsService from "../services/KeychainsService"

const query = new KeychainsService().query
</script>
