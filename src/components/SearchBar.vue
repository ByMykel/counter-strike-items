<template>
    <div
        class="sticky top-0 left-0 right-0 px-5 pt-3 pb-2 duration-300 z-10 gap-2 flex flex-col"
        :class="[scrolledDown ? 'bg-black-300 shadow-lg' : 'bg-transparent']"
    >
        <div class="relative">
            <div class="absolute left-0 flex items-center h-full px-2">
                <MagnifyingGlassIcon class="w-6 h-6 text-black-200" />
            </div>
            <div class="absolute right-0 flex items-center h-full gap-2 px-3">
                <p
                    v-if="!loading"
                    class="px-2 text-sm text-white rounded-md bg-black-200 hidden sm:block"
                >
                    total
                    <span class="font-semibold">{{ total }}</span>
                </p>
                <div
                    v-else
                    class="w-20 h-6 px-2 rounded-md bg-black-200 animate-pulse"
                />
                <div
                    class="w-0.5 h-[calc(100%-20px)] rounded-full bg-black-200/20"
                />
                <Menu
                    as="div"
                    class="relative"
                >
                    <MenuButton
                        class="p-1 rounded-md hover:bg-black-200 relative"
                    >
                        <ArrowsUpDownIcon class="w-6 h-6 text-black-100" />
                        <div
                            v-if="sortBy"
                            class="absolute top-1 right-1 bg-[#ff5e65] size-2 rounded-full"
                        />
                    </MenuButton>
                    <MenuItems
                        class="absolute right-0 top-full mt-2 w-44 rounded-lg border border-black-200/20 bg-black-400 shadow-xl z-20 p-1 focus:outline-none"
                    >
                        <MenuItem
                            v-for="option in sortOptions"
                            :key="option.value"
                            v-slot="{ active }"
                        >
                            <button
                                type="button"
                                class="w-full text-left px-3 py-1.5 text-sm rounded-md"
                                :class="[
                                    sortBy === option.value
                                        ? 'text-[#ff5e65] font-medium'
                                        : 'text-gray-300',
                                    active ? 'bg-black-300' : ''
                                ]"
                                @click="emit('set-sort-by', option.value)"
                            >
                                {{ option.label }}
                            </button>
                        </MenuItem>
                    </MenuItems>
                </Menu>
                <button
                    v-if="hasFilters"
                    type="button"
                    class="p-1 rounded-md hover:bg-black-200 relative"
                    @click="$emit('open-filters')"
                >
                    <FunnelIcon class="w-6 h-6 text-black-100" />
                    <div
                        v-if="hasSelectedFilters"
                        class="absolute top-1 right-1 bg-[#ff5e65] size-2 rounded-full"
                    />
                </button>
            </div>
            <input
                v-model="query"
                class="w-full h-full py-4 pl-12 pr-36 sm:pr-60 text-white border-0 rounded-md outline-none bg-black-300 focus:outline-none sm:text-sm focus:ring-2 focus:ring-[#ff5e65] focus:border-transparent"
                type="text"
                placeholder="Search..."
                @keyup.enter="$emit('input', query)"
            >
        </div>
        <div
            v-if="hasSelectedFilters"
            class="flex gap-2 overflow-x-auto pb-0.5"
        >
            <div
                v-for="(values, prop) in filtersValues"
                :key="prop"
                class="flex items-center gap-1 text-sm p-1 flex-shrink-0 text-white rounded-md bg-black-300"
            >
                <div class="">
                    {{ filters.find((f) => f.prop === prop)?.name || prop }}
                </div>
                <div class="flex items-center gap-1 flex-wrap">
                    <button
                        v-for="value in values"
                        :key="value"
                        type="button"
                        class="text-white bg-black-200 px-1 rounded-md flex items-center gap-1"
                        @click="$emit('remove-filter', { prop, value })"
                    >
                        <XMarkIcon class="size-4 text-white" />
                        {{
                            filters
                                .find((f) => f.prop === prop)
                                ?.options.find((o) => o.id === value)?.name ||
                                value
                        }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue"
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue"
import {
    MagnifyingGlassIcon,
    FunnelIcon,
    XMarkIcon,
    ArrowsUpDownIcon
} from "@heroicons/vue/24/outline"
import { Filter } from "../types"

const sortOptions = [
    { value: "", label: "Default" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" }
]

const props = defineProps<{
    query: string
    total: number
    scrolledDown: boolean
    hasFilters: boolean
    hasSelectedFilters: boolean
    sortBy?: string
    loading: boolean
    filters: Filter[]
    filtersValues: { [prop: string]: string[] }
}>()

const emit = defineEmits([
    "input",
    "open-filters",
    "remove-filter",
    "set-sort-by"
])

const query = ref(props.query || "")

watch(
    () => props.query,
    (newValue) => {
        query.value = newValue
    }
)
</script>
