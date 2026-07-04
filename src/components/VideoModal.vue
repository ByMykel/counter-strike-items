<template>
    <Transition
        enter-active-class="transition-opacity duration-200"
        leave-active-class="transition-opacity duration-200"
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
    >
        <div
            v-if="open"
            class="fixed inset-0 z-[70] flex items-center justify-center bg-black-500/85 p-4"
            @click.self="$emit('close')"
        >
            <div class="flex flex-col w-full max-w-[min(92vw,124vh)]">
                <div class="flex items-center justify-between gap-3 mb-2">
                    <p
                        class="text-sm sm:text-base font-medium text-white truncate"
                        :title="name"
                    >
                        {{ name }}
                    </p>
                    <button
                        type="button"
                        aria-label="Close video"
                        class="shrink-0 p-1.5 rounded-md text-black-100 hover:text-white hover:bg-black-300 transition-colors cursor-pointer"
                        @click="$emit('close')"
                    >
                        <XMarkIcon class="size-6" />
                    </button>
                </div>

                <video
                    v-if="video"
                    :key="video"
                    :src="video"
                    class="block w-full aspect-video rounded-lg bg-black-500 shadow-2xl"
                    autoplay
                    controls
                    playsinline
                    @ended="onEnded"
                />

                <!-- Controls under the video -->
                <div class="mt-3 flex flex-wrap items-center gap-2 sm:gap-3">
                    <button
                        type="button"
                        :disabled="!hasPrev"
                        class="flex-1 sm:flex-none flex items-center justify-center gap-1 px-3 py-2.5 sm:py-2 rounded-lg text-sm text-white bg-black-300 transition-colors hover:bg-black-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                        @click="$emit('prev')"
                    >
                        <ChevronLeftIcon class="size-5" />
                        Prev
                    </button>
                    <button
                        type="button"
                        :disabled="!hasNext"
                        class="flex-1 sm:flex-none flex items-center justify-center gap-1 px-3 py-2.5 sm:py-2 rounded-lg text-sm text-white bg-black-300 transition-colors hover:bg-black-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                        @click="$emit('next')"
                    >
                        Next
                        <ChevronRightIcon class="size-5" />
                    </button>

                    <label
                        class="flex items-center gap-2 px-2 py-1 text-sm text-gray-300 cursor-pointer select-none"
                    >
                        <input
                            v-model="autoNext"
                            type="checkbox"
                            class="size-4 rounded border-black-200 bg-black-300 text-[#ff5e65] focus:ring-[#ff5e65] cursor-pointer"
                        >
                        Autoplay next
                    </label>

                    <a
                        v-if="steamUrl"
                        :href="steamUrl"
                        target="_blank"
                        rel="noopener"
                        class="w-full sm:w-auto sm:ml-auto flex items-center justify-center gap-1.5 px-3 py-2.5 sm:py-2 rounded-lg text-sm text-white bg-black-300 transition-colors hover:bg-black-200 cursor-pointer"
                    >
                        <LinkIcon class="size-5" />
                        Steam Community Market
                    </a>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from "vue"
import {
    XMarkIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    LinkIcon
} from "@heroicons/vue/24/outline"

const props = defineProps<{
    open: boolean
    video: string
    name: string
    steamUrl: string
    hasPrev: boolean
    hasNext: boolean
}>()

const emit = defineEmits<{
    close: []
    prev: []
    next: []
}>()

const autoNext = ref(true)

function onEnded() {
    if (autoNext.value && props.hasNext) emit("next")
}

function onKeydown(e: KeyboardEvent) {
    if (e.key === "Escape") emit("close")
    else if (e.key === "ArrowLeft" && props.hasPrev) emit("prev")
    else if (e.key === "ArrowRight" && props.hasNext) emit("next")
}

watch(
    () => props.open,
    (isOpen) => {
        if (isOpen) window.addEventListener("keydown", onKeydown)
        else window.removeEventListener("keydown", onKeydown)
    }
)

onBeforeUnmount(() => window.removeEventListener("keydown", onKeydown))
</script>
