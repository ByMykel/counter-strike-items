<template>
    <span class="relative inline-flex items-center justify-center">
        <svg
            v-if="isLoading"
            class="absolute inset-0 m-auto animate-spin text-white/10"
            :class="spinnerClass"
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
            :src="src"
            :alt="alt"
            draggable="false"
            :class="[imgClass, { 'opacity-0': isLoading }]"
            @load="isLoading = false"
            @error="isLoading = false"
            @dragstart.prevent
        >
    </span>
</template>

<script setup lang="ts">
import { ref } from "vue"

withDefaults(
    defineProps<{
        src: string
        alt: string
        imgClass?: string
        spinnerClass?: string
    }>(),
    {
        imgClass: "",
        spinnerClass: "size-5"
    }
)

const isLoading = ref(true)
</script>
