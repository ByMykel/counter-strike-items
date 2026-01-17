<template>
    <BaseItemListView
        :query="query"
        store-id="souvenir-charm"
        title="Souvenir Charm - Counter-Strike items"
    />
</template>

<script setup lang="ts">
import BaseItemListView from "../components/BaseItemListView.vue"
import SouvenirCharmService from "../services/SouvenirCharmService"

const query = new SouvenirCharmService().query
</script>
