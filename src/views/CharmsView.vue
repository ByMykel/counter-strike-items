<template>
    <BaseItemListView
        :query="query"
        store-id="charms"
        title="Charms - Counter-Strike items"
    />
</template>

<script setup lang="ts">
import BaseItemListView from "../components/BaseItemListView.vue"
import CharmsService from "../services/CharmsService"

const query = new CharmsService().query
</script>
