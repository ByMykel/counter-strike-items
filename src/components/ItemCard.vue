<template>
    <div class="flex flex-col">
        <div
            class="relative block h-[12rem] p-1 overflow-hidden border-2 border-transparent rounded-md outline-none cursor-pointer focus:border-blue-500 hover:border-blue-500"
        >
            <div
                v-if="getItemSteamPrice"
                class="absolute z-10 flex gap-1 text-sm font-semibold text-white top-2 left-2"
            >
                $ {{ getItemSteamPrice }}
            </div>

            <img
                class="object-contain w-full h-full px-8 md:px-12 py-4 rounded-md bg-black-300/80 bg-[url('/img/graph-paper.svg')]"
                :src="image"
                :alt="name"
            >
        </div>
        <div>
            <p
                class="text-sm truncate px-0.5 mt-1.5 text-white"
                :title="name"
            >
                {{ name }}
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { usePricesStore } from "../stores/prices"

const { getPrice } = usePricesStore()

const props = defineProps<{
    id: string
    name: string
    image: string
}>()

const getItemSteamPrice = computed(() => {
    const prices = getPrice(props.name)
    return (
        prices?.steam.last_7d ||
        prices?.steam.last_24h ||
        prices?.steam.last_30d ||
        prices?.steam.last_90d ||
        null
    )
})
</script>
