<template>
    <div
        class="sticky top-0 left-0 right-0 z-50 px-5 pt-3 pb-2 duration-300"
        :class="[scrolledDown ? 'bg-black-300 shadow-lg' : 'bg-transparent']"
    >
        <div class="relative">
            <div class="absolute left-0 flex items-center h-full px-2">
                <MagnifyingGlassIcon class="w-6 h-6 text-black-200" />
            </div>
            <div class="absolute right-0 flex items-center h-full px-3">
                <p
                    v-if="total"
                    class="px-2 text-sm text-white rounded-md bg-black-200"
                >
                    total <span class="font-semibold">{{ total }}</span>
                </p>
                <div
                    v-else
                    class="w-20 h-6 px-2 rounded-md bg-black-200 animate-pulse"
                />
            </div>
            <input
                v-model="query"
                class="w-full h-full py-4 pl-12 text-white rounded-md bg-black-300 focus:outline-none sm:text-sm"
                :class="{
                    'focus:ring-2 focus:ring-[#ff5e65] focus:border-[#ff5e65]':
                        !scrolledDown
                }"
                type="text"
                placeholder="Search..."
                @keyup.enter="$emit('input', query)"
            >
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline"

const props = defineProps<{
    query: string
    total?: number
    scrolledDown: boolean
}>()

defineEmits(["input"])

const query = ref(props.query || "")
</script>
