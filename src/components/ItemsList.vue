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
            class="grid w-full gap-4 p-4 px-5 pb-32 mx-auto overflow-y-scroll h-[calc(100vh-69px)] grid-cols-1 md:grid-cols-2"
        >
            <ItemVideo
                v-for="item in items"
                :key="item.id"
                :name="item.name"
                :video="item.video ?? ''"
                :thumbnail="item.thumbnail ?? ''"
                @play="openVideo(item)"
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

        <VideoModal
            :open="!!activeVideo"
            :video="activeVideo?.video ?? ''"
            :name="activeVideo?.name ?? ''"
            :steam-url="activeVideoSteamUrl"
            :has-prev="activeIndex !== null && activeIndex > 0"
            :has-next="activeIndex !== null && activeIndex < items.length - 1"
            @close="closeVideo"
            @prev="prevVideo"
            @next="nextVideo"
        />
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, type ComponentPublicInstance } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useScroll, useElementSize, useVirtualList } from "@vueuse/core"
import { CSItem, Filter } from "../types"
import SearchBar from "./SearchBar.vue"
import ItemCard from "./ItemCard.vue"
import ItemVideo from "./ItemVideo.vue"
import ItemsSkeleton from "./ItemsSkeleton.vue"
import VideoModal from "./VideoModal.vue"

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

// Video playback modal (highlights / souvenir charms).
const activeIndex = ref<number | null>(null)
const activeVideo = computed(() =>
    activeIndex.value === null ? null : props.items[activeIndex.value] ?? null
)
const activeVideoSteamUrl = computed(() => {
    const name = activeVideo.value?.market_hash_name
    return name
        ? `https://steamcommunity.com/market/listings/730/${encodeURIComponent(name)}?l=english`
        : ""
})
function openVideo(item: CSItem) {
    activeIndex.value = props.items.findIndex((i) => i.id === item.id)
}
function closeVideo() {
    activeIndex.value = null
}
function prevVideo() {
    if (activeIndex.value !== null && activeIndex.value > 0) activeIndex.value--
}
function nextVideo() {
    if (
        activeIndex.value !== null &&
        activeIndex.value < props.items.length - 1
    )
        activeIndex.value++
}

// Reflect the open video in the URL (?video=<id>) so it can be shared.
const route = useRoute()
const router = useRouter()

watch(
    () => activeVideo.value?.id ?? null,
    (id) => {
        const query = { ...route.query }
        if (id) query.video = id
        else delete query.video
        router.replace({ query })
    }
)

// Open the shared video once the (video) list has loaded.
watch(
    () => props.items,
    (items) => {
        if (!props.isVideo || activeIndex.value !== null) return
        const shared = route.query.video
        if (typeof shared === "string" && shared) {
            const idx = items.findIndex((item) => item.id === shared)
            if (idx >= 0) activeIndex.value = idx
        }
    },
    { immediate: true }
)

// Sticky search-bar shadow uses the active container's scroll position.
const videoEl = ref<HTMLElement | null>(null)
const { y: videoY } = useScroll(videoEl)
const { y: gridY } = useScroll(scrollEl)
const y = computed(() => (props.isVideo ? videoY.value : gridY.value))
</script>
