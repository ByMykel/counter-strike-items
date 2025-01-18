<template>
    <div class="flex flex-col">
        <button
            type="button"
            class="relative block h-[12rem] p-1 overflow-hidden border-2 border-transparent rounded-md outline-none cursor-pointer focus:border-[#ff5e65] hover:border-[#ff5e65]"
            @click="$emit('show')"
        >
            <img
                class="object-contain w-full pointer-events-none h-full py-4 rounded-md bg-black-300/80 bg-[url('/img/graph-paper.svg')]"
                :class="{ 'pb-0': id.includes('agent-') }"
                :src="image"
                :alt="name"
            >

            <div
                v-if="marketHashName && getItemSteamPrice(marketHashName)"
                class="absolute flex gap-1 text-sm font-semibold text-white top-2 left-2"
            >
                {{
                    getItemSteamPriceInCurrency(
                        getItemSteamPrice(marketHashName),
                        getCurrentCurrency()
                    )
                }}
            </div>

            <div
                class="absolute flex gap-1 text-sm font-semibold text-white top-2 right-2"
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
        </button>
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
import { usePricesStore } from "../stores/prices"
import { getCurrentCurrency } from "../utils"

const { getItemSteamPrice, getItemSteamPriceInCurrency } = usePricesStore()

defineProps<{
    id: string
    name: string
    image: string
    souvenir: boolean
    stattrak: boolean
    rare: boolean
    genuine: boolean
    marketHashName?: string
}>()

defineEmits(["show"])
</script>
