<template>
    <div
        class="h-dvh lg:border-l-2 border-black-300 md:w-80 xl:w-[25rem] flex flex-col absolute inset-0 md:relative z-50 bg-black-400"
    >
        <div
            class="flex items-center w-full h-[69px] border-b-2 border-black-300 px-4 sticky top-0 text-black-100"
        >
            <button
                class="disabled:cursor-wait"
                @click="$emit('close')"
            >
                <XMarkIcon class="w-6 h-6 text-white" />
            </button>
        </div>

        <div class="h-[calc(100vh-69px)] px-4 py-4 pt-0 overflow-x-hidden">
            <div class="divide-y-2 divide-black-300">
                <div
                    v-for="filter in filters"
                    :key="filter.prop"
                    class="py-4"
                >
                    <p class="mb-2 font-semibold text-gray-100">
                        {{ filter.name }}
                    </p>
                    <FiltersPanelControl
                        :prop="filter.prop"
                        :name="filter.name"
                        :type="filter.type"
                        :options="filter.options"
                        :values="filtersValues[filter.prop] ?? []"
                        @update:values="$emit('set-filters', $event)"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { XMarkIcon } from "@heroicons/vue/24/outline"
import FiltersPanelControl from "../components/FiltersPanelControl.vue"

defineProps<{
    filters: {
        prop: string
        name: string
        type: string
        options: { id: string; name: string }[]
    }[]
    filtersValues: { [prop: string]: string[] }
}>()
defineEmits(["close", "set-filters"])
</script>
