<template>
    <div class="flex flex-col">
        <div
            type="button"
            class="relative block p-1 border-2 border-transparent rounded-md outline-none"
        >
            <video
                class="object-cover w-full h-full aspect-video rounded-md bg-black-300/80 bg-[url('../img/graph-paper.svg')]"
                :src="video"
                :alt="name"
                muted
                playsinline
                controls
            />

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
import { usePricesStore } from "../stores/prices"
import { getCurrentCurrency } from "../utils"

const { getItemSteamPrice, getItemSteamPriceInCurrency } = usePricesStore()

defineProps<{
    id: string
    name: string
    video: string
    marketHashName?: string
}>()

defineEmits(["show"])
</script>
