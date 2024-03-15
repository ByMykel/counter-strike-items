<template>
    <div>
        <label
            v-for="(option, index) in options"
            :key="index"
            class="flex items-center gap-2 p-2 text-gray-300 rounded-md cursor-pointer hover:bg-black-300"
        >
            <input
                type="checkbox"
                class="w-4 h-4 text-[#ff5e65] border-gray-300 rounded focus:ring-[#ff5e65]"
                :value="option.id"
                :checked="isSelected(option.id)"
                @change="toggleOption(option.id)"
            >
            {{ option.name }}
        </label>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

const props = defineProps<{
    options: { id: string; name: string }[]
    values: string[]
}>()

const emit = defineEmits(["update:values"])

const selectedOptions = ref<string[]>(props.values)

const toggleOption = (id: string) => {
    const index = selectedOptions.value.indexOf(id)
    if (index === -1) {
        selectedOptions.value.push(id)
    } else {
        selectedOptions.value.splice(index, 1)
    }
    emit("update:values", selectedOptions.value)
}

const isSelected = (id: string) => {
    return selectedOptions.value.includes(id)
}
</script>
