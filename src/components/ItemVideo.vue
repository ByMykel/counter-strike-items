<template>
    <div class="flex flex-col">
        <media-player
            class="object-cover w-full h-full rounded-md flex items-center justify-center"
            :src="video"
            :current-time="3"
            cross-origin
            plays-inline
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
import "vidstack/bundle"

defineProps<{
    name: string
    video: string
}>()

defineEmits(["show"])
</script>
