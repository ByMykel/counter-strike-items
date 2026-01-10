<template>
    <BaseItemListView
        :query="query"
        store-id="keys"
        title="Keys - Counter-Strike items"
    />
</template>

<script setup lang="ts">
import BaseItemListView from "../components/BaseItemListView.vue"
import KeysService from "../services/KeysService"

const query = new KeysService().query
</script>
