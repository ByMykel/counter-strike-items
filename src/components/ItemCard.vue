<template>
    <div class="flex flex-col">
        <button
            type="button"
            class="relative block h-[12rem] p-1 overflow-hidden border-2 border-transparent rounded-md outline-none cursor-pointer focus:border-[#ff5e65] hover:border-[#ff5e65]"
            @click="$emit('show')"
        >
            <img
                class="object-contain w-full pointer-events-none h-full py-4 rounded-md bg-black-300/80 bg-[url('../img/graph-paper.svg')]"
                :class="{
                    'pb-0': id.includes('agent-'),
                    'border-2 border-yellow-500':
                        isDebugMode && image.includes('githubusercontent')
                }"
                :src="image"
                :alt="name"
            >

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
            <p
                class="text-xs px-0.5"
                :class="formattedPrice ? 'text-green-400' : 'text-black-100'"
            >
                {{ priceLabel }}
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useDebug } from "../composables/useDebug"
import { usePriceStore } from "../stores/prices"

const props = defineProps<{
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

const { isDebugMode } = useDebug()
const priceStore = usePriceStore()

const formattedPrice = computed(() => priceStore.getPrice(props.marketHashName))
const priceLabel = computed(() => {
    if (formattedPrice.value) return formattedPrice.value
    return priceStore.isMarketable(props.marketHashName)
        ? "No price available"
        : "Not marketable"
})
</script>
