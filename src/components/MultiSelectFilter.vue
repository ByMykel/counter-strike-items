<template>
    <div>
        <input
            v-model="search"
            class="w-full h-full py-3 text-white rounded-md outline-none bg-black-300 border-2 border-black-300 focus:outline-none mb-4 sm:text-sm focus:ring-2 focus:ring-[#ff5e65] focus:border-transparent"
            type="text"
            placeholder="Search to filter..."
        >
        <label
            v-for="option in filteredOptions"
            :key="option.id"
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
import { ref, computed } from "vue"

const props = defineProps<{
    options: { id: string; name: string }[]
    values: string[]
}>()

const emit = defineEmits(["update:values"])

const search = ref("")

const filteredOptions = computed(() => {
    return props.options.filter((option) => {
        return option.name
            .toLocaleLowerCase()
            .includes(search.value.toLocaleLowerCase())
    })
})

const toggleOption = (id: string) => {
    const selectedOptions = props.values
    const index = selectedOptions.indexOf(id)
    if (index === -1) {
        selectedOptions.push(id)
    } else {
        selectedOptions.splice(index, 1)
    }
    emit("update:values", selectedOptions)
}

const isSelected = (id: string) => {
    return props.values.includes(id)
}
</script>
