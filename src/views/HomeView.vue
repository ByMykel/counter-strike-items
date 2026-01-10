<template>
    <BaseItemListView
        :query="query"
        store-id="home"
        title="All - Counter-Strike items"
        :filter-transform="filterTransform"
    />
</template>

<script setup lang="ts">
import BaseItemListView from "../components/BaseItemListView.vue"
import HomeService from "../services/HomeService"
import { useDebug } from "../composables/useDebug"
import { Filter } from "../types"

const { isDebugMode } = useDebug()

const query = new HomeService().query

// Filter out CDN filter when not in debug mode
function filterTransform(filters: Filter[]): Filter[] {
    if (isDebugMode.value) {
        return filters
    }
    return filters.filter((filter) => filter.prop !== "image_domain")
}
</script>
