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

            <div
                class="absolute z-10 flex gap-1 text-sm font-semibold text-white top-2 right-2"
            >
                <div
                    v-if="souvenir"
                    class="bg-[#ffd700] h-3 w-3 rounded-full"
                    title="Souvenir"
                />
                <div
                    v-if="stattrak"
                    class="bg-[#cf6a32] h-3 w-3 rounded-full"
                    title="StatTrak"
                />
                <div
                    v-if="rare"
                    class="bg-[#8650ac] h-3 w-3 rounded-full"
                    title="Rare"
                />
                <div
                    v-if="genuine"
                    class="bg-[#4d7455] h-3 w-3 rounded-full"
                    title="Rare"
                />
            </div>

            <img
                class="object-contain w-full h-full py-4 rounded-md bg-black-300/80 bg-[url('/img/graph-paper.svg')]"
                :class="{ 'pb-0': id.includes('agent-') }"
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
    souvenir: boolean
    stattrak: boolean
    rare: boolean
    genuine: boolean
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
