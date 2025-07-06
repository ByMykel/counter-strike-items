<template>
    <div
        ref="containerRef"
        class="flex flex-col"
    >
        <div
            type="button"
            class="relative block p-1 border-2 border-transparent rounded-md outline-none"
        >
            <!-- Placeholder when not in viewport -->
            <div
                v-if="!isInViewport"
                class="object-cover w-full h-full aspect-video rounded-md bg-black-300/80 bg-[url('../img/graph-paper.svg')] flex items-center justify-center"
            >
                <div class="text-white/50 text-sm">
                    Loading...
                </div>
            </div>

            <!-- Video when in viewport -->
            <video
                v-else
                ref="videoRef"
                class="object-cover w-full h-full aspect-video rounded-md bg-black-300/80 bg-[url('../img/graph-paper.svg')]"
                :src="video"
                :alt="name"
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
import { ref, onMounted, watch } from "vue"

const { getItemSteamPrice, getItemSteamPriceInCurrency } = usePricesStore()

const videoRef = ref<HTMLVideoElement>()
const isInViewport = ref(false)
const containerRef = ref<HTMLElement>()

defineProps<{
    id: string
    name: string
    video: string
    marketHashName?: string
}>()

defineEmits(["show"])

const setupVideo = () => {
    if (videoRef.value) {
        const video = videoRef.value

        const setPosterFrame = () => {
            video.currentTime = 3
        }

        // Reset to beginning when user starts playing
        const handlePlay = () => {
            if (video.currentTime === 3) {
                video.currentTime = 0
            }
            video.removeEventListener("play", handlePlay)
        }

        video.addEventListener("play", handlePlay)

        // Try to set poster frame when metadata is loaded
        if (video.readyState >= 1) {
            setPosterFrame()
        } else {
            video.addEventListener("loadedmetadata", setPosterFrame, {
                once: true
            })
        }
    }
}

onMounted(() => {
    if (containerRef.value) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        isInViewport.value = true
                        observer.disconnect()
                    }
                })
            },
            {
                rootMargin: "50px" // Start loading 50px before entering viewport
            }
        )

        observer.observe(containerRef.value)
    }
})

// Watch for when video becomes available and set it up
watch(isInViewport, (newValue) => {
    if (newValue) {
        // Wait for next tick to ensure video element is rendered
        setTimeout(setupVideo, 0)
    }
})
</script>
