<template>
    <div class="relative flex-1 w-full">
        <SearchBar
            :query="query"
            :scrolled-down="y > 40"
            :total="allItemsStore.total"
            @input="inputChanged"
        />
        <div
            ref="el"
            class="grid w-full gap-3 p-4 px-5 pb-32 mx-auto overflow-y-scroll h-dvh items-grid-small md:items-grid"
        >
            <ItemCard
                v-for="item in allItemsStore.items"
                :id="item.id"
                :key="item.id"
                :name="item.name"
                :image="item.image"
                @click="selectItem(item.id)"
            />
            <ItemsSkeleton v-if="allItemsStore.loading" />
            <div
                v-if="!allItemsStore.loading"
                v-element-visibility="onElementVisibility"
                class="py-10"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useDebounceFn } from "@vueuse/core"
import { vElementVisibility } from "@vueuse/components"

import { useScroll } from "@vueuse/core"
import ItemsSkeleton from "../components/ItemsSkeleton.vue"
import SearchBar from "../components/SearchBar.vue"
import ItemCard from "../components/ItemCard.vue"

import { usePricesStore } from "../stores/prices"
import { useAllItemsStore } from "../stores/allItems"

import { useItemDetailStore } from "../stores/ItemDetail"

const itemDetailStore = useItemDetailStore()
const allItemsStore = useAllItemsStore()

const el = ref<HTMLElement | null>(null)
const { y } = useScroll(el)

const query = ref(getQueryParam("q"))

const isVisible = ref(false)

const { fetchPrices } = usePricesStore()

fetchPrices()

const debouncedFn = useDebounceFn(() => {
    allItemsStore.fetchItems(query.value)
}, 400)

// onMounted(() => {
//     window.addEventListener("popstate", () => {
//         const newQuery = getQueryParam("q")

//         if (newQuery !== query.value) {
//             query.value = newQuery
//         }

//         allItemsStore.fetchItems(query.value)
//     })
// })

function inputChanged(value: string) {
    query.value = value
    updateQueryParam()
    debouncedFn()
}

function getQueryParam(param: string) {
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get(param) || ""
}

function updateQueryParam() {
    const currentURL = new URL(window.location.href)

    if (query.value) {
        currentURL.searchParams.set("q", query.value)
    } else {
        currentURL.searchParams.delete("q")
    }

    // Update the URL without refreshing the page
    history.pushState({}, "", currentURL.toString())
}

function onElementVisibility(state: boolean) {
    isVisible.value = state

    if (state === true) {
        allItemsStore.loadMore()
    }
}

async function selectItem(id: string) {
    itemDetailStore.getItemDetails(id)
}

allItemsStore.fetchItems(query.value)
</script>
