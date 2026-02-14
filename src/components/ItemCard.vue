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
                loading="lazy"
            >

            <div class="absolute flex flex-col items-end gap-1 top-2 right-2">
                <span
                    v-if="souvenir"
                    class="px-1.5 py-0.5 text-[10px] font-semibold leading-none tracking-wide rounded bg-[#ffd700]/90 text-gray-900"
                >
                    Souvenir
                </span>
                <span
                    v-if="stattrak"
                    class="px-1.5 py-0.5 text-[10px] font-semibold leading-none tracking-wide rounded bg-[#cf6a32]/90 text-white"
                >
                    StatTrak
                </span>
                <span
                    v-if="genuine"
                    class="px-1.5 py-0.5 text-[10px] font-semibold leading-none tracking-wide rounded bg-[#4d7455]/90 text-white"
                >
                    Genuine
                </span>
                <span
                    v-if="phase"
                    class="px-1.5 py-0.5 text-[10px] font-semibold leading-none tracking-wide rounded bg-[#5b98a8]/90 text-white"
                >
                    {{ phase }}
                </span>
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
    genuine: boolean
    phase?: string | null
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
