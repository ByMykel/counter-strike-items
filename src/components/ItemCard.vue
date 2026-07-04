<template>
    <div class="flex flex-col">
        <button
            type="button"
            class="relative block h-[13.5rem] p-1 overflow-hidden border-2 border-transparent rounded-md outline-none cursor-pointer focus:border-[#ff5e65] hover:border-[#ff5e65]"
            @click="$emit('show')"
        >
            <svg
                v-if="isLoading"
                class="absolute inset-0 z-10 m-auto size-6 animate-spin text-white/10"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                />
                <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
            </svg>
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
                @load="isLoading = false"
                @error="isLoading = false"
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
import { computed, ref } from "vue"
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

const isLoading = ref(true)

const formattedPrice = computed(() => priceStore.getPrice(props.marketHashName))
const priceLabel = computed(() => {
    if (formattedPrice.value) return formattedPrice.value
    return priceStore.isMarketable(props.marketHashName)
        ? "No price available"
        : "Not marketable"
})
</script>
