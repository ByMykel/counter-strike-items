<template>
    <BaseItemListView
        :query="query"
        store-id="base-weapons"
        title="Base weapons - Counter-Strike items"
    />
</template>

<script setup lang="ts">
import BaseItemListView from "../components/BaseItemListView.vue"
import BaseWeaponsService from "../services/BaseWeaponsService"

const query = new BaseWeaponsService().query
</script>
