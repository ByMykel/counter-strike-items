<template>
    <div v-if="type === 'multi-select'">
        <MultiSelectFilter
            :options="options"
            :values="values"
            @update:values="
                $emit('update:values', {
                    prop,
                    value: $event
                })
            "
        />
    </div>
    <div v-else-if="type === 'price-range'">
        <PriceRangeFilter
            :values="values"
            @update:values="
                $emit('update:values', {
                    prop,
                    value: $event
                })
            "
        />
    </div>
</template>

<script setup lang="ts">
import MultiSelectFilter from "../components/MultiSelectFilter.vue"
import PriceRangeFilter from "../components/PriceRangeFilter.vue"
import { FilterOption } from "../types"

defineProps<{
    prop: string
    name: string
    type: string
    options: FilterOption[]
    values: string[]
}>()

defineEmits(["close", "update:values"])
</script>
