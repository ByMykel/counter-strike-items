<template>
    <div
        class="inline-flex px-4 py-2 p-1 gap-0 w-full border-b-2 border-black-300"
    >
        <button
            v-for="(tab, index) in tabs"
            :key="tab.id"
            :class="[
                'px-4 py-2 text-sm font-medium transition-all',
                selectedTabId === tab.id
                    ? 'bg-black-300 text-white rounded shadow-sm'
                    : index === 0
                        ? 'bg-black-400 text-black-100 rounded-l'
                        : index === tabs.length - 1
                            ? 'bg-black-400 text-black-100 rounded-r'
                            : 'bg-black-400 text-black-100'
            ]"
            @click="$emit('select-tab', tab.id)"
        >
            {{ tab.name }}
        </button>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    tabs: Array<{ id: string; name: string }>
    selectedTabId: string
}>()

defineEmits<{
    "select-tab": [tabId: string]
}>()
</script>
