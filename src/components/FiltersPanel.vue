<template>
    <div
        class="h-dvh lg:border-l-2 border-black-300 md:w-80 xl:w-[30rem] flex flex-col absolute inset-0 md:relative z-50 bg-black-400"
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
            <p class="ml-4 truncate text-black-100">
                Filters
            </p>
        </div>

        <div class="h-[calc(100vh-69px)] py-4 pt-0 overflow-x-hidden">
            <div>
                <div
                    v-for="filter in filters"
                    :key="filter.prop"
                >
                    <button
                        class="sticky top-0 flex items-center justify-between w-full p-4 font-semibold text-gray-100 border-b-2 border-black-300 bg-black-400"
                        @click="show[filter.prop] = !show[filter.prop] ?? true"
                    >
                        <div>
                            {{ filter.name }}
                            <span class="text-sm font-normal text-black-100">({{
                                !filtersValues[filter.prop]?.length
                                    ? filter.options.length
                                    : `${filtersValues[filter.prop].length}/${filter.options.length}`
                            }})</span>
                        </div>

                        <ChevronDownIcon
                            class="w-6 h-6 duration-300 text-black-200"
                            :class="{ 'rotate-180': show[filter.prop] }"
                        />
                    </button>

                    <div
                        v-if="show[filter.prop]"
                        class="p-4"
                    >
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
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { XMarkIcon, ChevronDownIcon } from "@heroicons/vue/24/outline"
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

const show = ref<{ [prop: string]: boolean }>({})
</script>
