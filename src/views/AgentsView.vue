<template>
    <BaseItemListView
        :query="query"
        store-id="agents"
        title="Agents - Counter-Strike items"
    />
</template>

<script setup lang="ts">
import BaseItemListView from "../components/BaseItemListView.vue"
import AgentsService from "../services/AgentsService"

const query = new AgentsService().query
</script>
