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
</template>

<script setup lang="ts">
import MultiSelectFilter from "../components/MultiSelectFilter.vue"

defineProps<{
    prop: string
    name: string
    type: string
    options: { id: string; name: string }[]
    values: string[]
}>()

defineEmits(["close", "update:values"])
</script>
