<template>
    <div
        class="flex items-center justify-between border-black-300 border-b-2 h-[69px] px-4"
    >
        <AppBranding />
        <div class="flex items-center gap-2">
            <RouterLink
                to="/home"
                class="flex items-center gap-2 px-3 py-2 rounded-md text-black-100 hover:bg-black-300 hover:text-white transition-colors"
            >
                <ArrowLeftIcon class="w-5 h-5" />
                <span class="text-sm font-medium">Back to Home</span>
            </RouterLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import { ArrowLeftIcon } from "@heroicons/vue/24/outline"
import AppBranding from "./AppBranding.vue"
</script>
