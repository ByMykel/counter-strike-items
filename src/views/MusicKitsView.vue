<template>
    <BaseItemListView
        :query="query"
        store-id="music-kits"
        title="Music Kits - Counter-Strike items"
    />
</template>

<script setup lang="ts">
import BaseItemListView from "../components/BaseItemListView.vue"
import MusicKitsService from "../services/MusicKitsService"

const query = new MusicKitsService().query
</script>
