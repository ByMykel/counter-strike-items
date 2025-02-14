<template>
    <div class="w-16 relative h-12 shrink-0 flex items-center justify-center">
        <svg
            v-if="isLoading"
            class="size-5 animate-spin text-white/10"
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
        <div class="absolute inset-0 flex items-center justify-center">
            <img
                class="object-contain w-16"
                :class="{ 'opacity-0': isLoading }"
                :src="src"
                :alt="alt"
                @load="isLoading = false"
                @error="isLoading = false"
            >
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

defineProps<{
    src: string
    alt: string
}>()

const isLoading = ref(true)
</script>
