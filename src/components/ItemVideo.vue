<template>
    <div class="flex flex-col">
        <button
            type="button"
            class="relative w-full aspect-video rounded-md cursor-pointer bg-gray-800 group"
            @click="$emit('play')"
        >
            <img
                :src="thumbnail"
                :alt="name"
                class="w-full h-full object-cover rounded-md"
                loading="lazy"
                @load="imageLoaded = true"
                @error="imageLoaded = true"
            >

            <!-- Loading skeleton -->
            <div
                v-if="!imageLoaded"
                class="absolute inset-0 bg-black-300 rounded-md animate-pulse"
            />

            <!-- Play button overlay -->
            <div
                v-if="imageLoaded"
                class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 group-hover:bg-opacity-30 rounded-md transition-all"
            >
                <div
                    class="w-20 h-20 bg-white bg-opacity-90 rounded-full flex items-center justify-center group-hover:bg-opacity-100 group-hover:scale-105 transition-all"
                >
                    <svg
                        class="w-10 h-10 text-black ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M8 5v14l11-7z" />
                    </svg>
                </div>
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
import { ref } from "vue"

defineProps<{
    name: string
    video: string
    thumbnail: string
}>()

defineEmits(["play"])

const imageLoaded = ref(false)
</script>
