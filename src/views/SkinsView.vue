<template>
    <BaseItemListView
        :query="query"
        store-id="skins"
        title="Skins - Counter-Strike items"
    />
</template>

<script setup lang="ts">
import BaseItemListView from "../components/BaseItemListView.vue"
import SkinService from "../services/SkinService"

const query = new SkinService().query
</script>
