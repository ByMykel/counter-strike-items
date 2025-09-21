<template>
    <div class="flex flex-col">
        <div
            v-if="!shouldLoadVideo"
            class="relative w-full aspect-video rounded-md cursor-pointer bg-gray-800"
            @click="loadVideo"
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
                class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 rounded-md"
            >
                <div
                    class="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all"
                >
                    <svg
                        class="w-8 h-8 text-black ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M8 5v14l11-7z" />
                    </svg>
                </div>
            </div>
        </div>

        <media-player
            v-if="shouldLoadVideo"
            class="object-cover w-full h-full rounded-md flex items-center justify-center"
            :src="video"
            cross-origin
            plays-inline
            autoplay
        >
            <media-provider />
            <media-video-layout />
        </media-player>

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
import "vidstack/bundle"

defineProps<{
    name: string
    video: string
    thumbnail: string
}>()

defineEmits(["show"])

const shouldLoadVideo = ref(false)
const imageLoaded = ref(false)

function loadVideo() {
    shouldLoadVideo.value = true
}
</script>
