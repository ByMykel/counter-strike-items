<template>
    <div class="relative flex-1 w-full">
        <SearchBar
            :query="search"
            :scrolled-down="y > 40"
            :total="itemsCount"
            :loading="loading"
            :has-filters="hasFilters"
            :has-selected-filters="hasSelectedFilters"
            :filters="filters"
            :filters-values="filtersValues"
            @input="$emit('set-query', $event)"
            @open-filters="$emit('open-filters')"
            @remove-filter="$emit('remove-filter', $event)"
        />
        <div
            ref="el"
            class="grid w-full gap-3 p-4 px-5 pb-32 mx-auto overflow-y-scroll h-[calc(100vh-69px)]"
            :class="{
                'grid-cols-1 lg:grid-cols-2': isVideo,
                'items-grid-small md:items-grid': !isVideo
            }"
        >
            <template v-if="!isVideo">
                <ItemCard
                    v-for="item in items"
                    :id="item.id"
                    :key="item.id"
                    :name="item.name"
                    :image="item.image"
                    :souvenir="item?.souvenir ?? false"
                    :stattrak="item?.stattrak ?? false"
                    :rare="item?.rare ?? false"
                    :genuine="item?.genuine ?? false"
                    :market-hash-name="item.market_hash_name"
                    @show="$emit('select', item.id)"
                />
            </template>
            <template v-else>
                <ItemVideo
                    v-for="item in items"
                    :id="item.id"
                    :key="item.id"
                    :name="item.name"
                    :video="item.video"
                    :market-hash-name="item.market_hash_name"
                />
            </template>
            <ItemsSkeleton v-if="loading" />
            <div
                v-if="!loading"
                v-element-visibility="onElementVisibility"
                class="py-10"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useScroll } from "@vueuse/core"
import { vElementVisibility } from "@vueuse/components"
import { Filter } from "../types"
import SearchBar from "./SearchBar.vue"
import ItemCard from "./ItemCard.vue"
import ItemVideo from "./ItemVideo.vue"
import ItemsSkeleton from "./ItemsSkeleton.vue"

withDefaults(
    defineProps<{
        items: any[]
        itemsCount: number
        loading: boolean
        search: string
        hasFilters?: boolean
        hasSelectedFilters?: boolean
        filters: Filter[]
        filtersValues: { [prop: string]: string[] }
        isVideo?: boolean
    }>(),
    {
        hasFilters: false,
        hasSelectedFilters: false,
        isVideo: false
    }
)

const emit = defineEmits([
    "set-query",
    "select",
    "load-more",
    "open-filters",
    "remove-filter"
])

const el = ref<HTMLElement | null>(null)
const { y } = useScroll(el)
const isVisible = ref(false)

function onElementVisibility(state: boolean) {
    isVisible.value = state

    if (state === true) {
        emit("load-more")
    }
}
</script>
