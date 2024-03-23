<template>
    <div
        class="sticky top-0 left-0 right-0 z-50 px-5 pt-3 pb-2 duration-300"
        :class="[scrolledDown ? 'bg-black-300 shadow-lg' : 'bg-transparent']"
    >
        <div class="relative">
            <div class="absolute left-0 flex items-center h-full px-2">
                <MagnifyingGlassIcon class="w-6 h-6 text-black-200" />
            </div>
            <div class="absolute right-0 flex items-center h-full gap-2 px-3">
                <p
                    v-if="total > 0"
                    class="px-2 text-sm text-white rounded-md bg-black-200"
                >
                    total <span class="font-semibold">{{ total }}</span>
                </p>
                <div
                    v-else
                    class="w-20 h-6 px-2 rounded-md bg-black-200 animate-pulse"
                />
                <div
                    v-if="hasFilters"
                    class="w-0.5 h-[calc(100%-20px)] rounded-full bg-black-200/20"
                />
                <button
                    v-if="hasFilters"
                    type="button"
                    class="p-1 rounded-md hover:bg-black-200"
                    @click="$emit('open-filters')"
                >
                    <FunnelIcon class="w-6 h-6 text-black-100" />
                </button>
            </div>
            <input
                v-model="query"
                class="w-full h-full py-4 pl-12 text-white border-0 rounded-md outline-none bg-black-300 focus:outline-none sm:text-sm focus:ring-2 focus:ring-[#ff5e65] focus:border-transparent"
                type="text"
                placeholder="Search..."
                @keyup.enter="$emit('input', query)"
            >
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue"
import { MagnifyingGlassIcon, FunnelIcon } from "@heroicons/vue/24/outline"

const props = defineProps<{
    query: string
    total: number
    scrolledDown: boolean
    hasFilters: boolean
}>()

defineEmits(["input", "open-filters"])

const query = ref(props.query || "")

watch(
    () => props.query,
    (newValue) => {
        query.value = newValue
    }
)
</script>
