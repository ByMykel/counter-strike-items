<template>
    <div class="relative flex-1 w-full">
        <SearchBar
            v-if="hasSearch"
            :query="search"
            :scrolled-down="y > 40"
            :total="itemsCount"
            :loading="loading"
            :has-filters="hasFilters"
            :has-selected-filters="hasSelectedFilters"
            :sort-by="sortBy"
            :show-sort="!isVideo"
            :filters="filters"
            :filters-values="filtersValues"
            @input="$emit('set-query', $event)"
            @set-sort-by="$emit('set-sort-by', $event)"
            @open-filters="$emit('open-filters')"
            @remove-filter="$emit('remove-filter', $event)"
        />

        <!-- Video lists: modest size, rendered in full (thumbnails lazy-load). -->
        <div
            v-if="isVideo"
            ref="videoEl"
            class="grid w-full gap-3 p-4 px-5 pb-32 mx-auto overflow-y-scroll h-[calc(100vh-69px)] grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
        >
            <ItemVideo
                v-for="item in items"
                :key="item.id"
                :name="item.name"
                :video="item.video ?? ''"
                :thumbnail="item.thumbnail ?? ''"
            />
            <ItemsSkeleton v-if="loading" />
        </div>

        <!-- Item grid: virtualized by row so the DOM stays constant no matter
             how large the list is. -->
        <div
            v-else
            :ref="setScrollEl"
            :style="containerProps.style"
            class="w-full px-5 py-4 overflow-y-scroll h-[calc(100vh-69px)]"
            @scroll="containerProps.onScroll"
        >
            <div
                v-if="loading"
                class="grid w-full gap-3 items-grid-small md:items-grid"
            >
                <ItemsSkeleton />
            </div>
            <div
                v-else
                v-bind="wrapperProps"
            >
                <div
                    v-for="row in virtualRows"
                    :key="row.index"
                    class="grid gap-3"
                    :style="{
                        height: `${ROW_HEIGHT}px`,
                        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`
                    }"
                >
                    <ItemCard
                        v-for="item in row.data"
                        :id="item.id"
                        :key="item.id"
                        :name="item.name"
                        :image="item.image ?? ''"
                        :souvenir="item?.souvenir ?? false"
                        :stattrak="item?.stattrak ?? false"
                        :genuine="item?.genuine ?? false"
                        :phase="item?.phase ?? null"
                        :market-hash-name="item.market_hash_name"
                        @show="$emit('select', item.id)"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, type ComponentPublicInstance } from "vue"
import { useScroll, useElementSize, useVirtualList } from "@vueuse/core"
import { CSItem, Filter } from "../types"
import SearchBar from "./SearchBar.vue"
import ItemCard from "./ItemCard.vue"
import ItemVideo from "./ItemVideo.vue"
import ItemsSkeleton from "./ItemsSkeleton.vue"

// Fixed card height (image 12rem + name + price) plus the inter-row gap.
const ROW_HEIGHT = 246
const GAP = 12

const props = withDefaults(
    defineProps<{
        items: CSItem[]
        itemsCount: number
        loading: boolean
        search: string
        sortBy?: string
        hasFilters?: boolean
        hasSelectedFilters?: boolean
        filters: Filter[]
        filtersValues: { [prop: string]: string[] }
        isVideo?: boolean
        hasSearch?: boolean
    }>(),
    {
        sortBy: "",
        hasFilters: false,
        hasSelectedFilters: false,
        isVideo: false,
        hasSearch: true
    }
)

defineEmits([
    "set-query",
    "set-sort-by",
    "select",
    "open-filters",
    "remove-filter"
])

// Scroll container. Measured for column count; also fed to useVirtualList.
const scrollEl = ref<HTMLElement | null>(null)
const { width } = useElementSize(scrollEl)

// Column count derived from the measured content width, matching the CSS grid
// (`minmax(240px, ...)` at md+, `minmax(140px, ...)` below).
const columns = computed(() => {
    const w = width.value
    if (!w) return 1
    const cardMin = w >= 768 ? 240 : 140
    return Math.max(1, Math.floor((w + GAP) / (cardMin + GAP)))
})

// Group the flat item list into rows for row-based virtualization.
const rows = computed<CSItem[][]>(() => {
    const cols = columns.value
    const src = props.items
    const out: CSItem[][] = []
    for (let i = 0; i < src.length; i += cols) {
        out.push(src.slice(i, i + cols))
    }
    return out
})

const {
    list: virtualRows,
    containerProps,
    wrapperProps
} = useVirtualList(rows, {
    itemHeight: ROW_HEIGHT,
    overscan: 5
})

// Share one element between our measurement ref and useVirtualList's ref.
function setScrollEl(el: Element | ComponentPublicInstance | null) {
    const node = (el as HTMLElement | null) ?? null
    scrollEl.value = node
    containerProps.ref.value = node
}

// Sticky search-bar shadow uses the active container's scroll position.
const videoEl = ref<HTMLElement | null>(null)
const { y: videoY } = useScroll(videoEl)
const { y: gridY } = useScroll(scrollEl)
const y = computed(() => (props.isVideo ? videoY.value : gridY.value))
</script>
