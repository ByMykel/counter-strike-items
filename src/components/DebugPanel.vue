<template>
    <div
        v-if="isDebugMode"
        class="p-3 bg-black-300 rounded-md mb-4"
    >
        <p class="text-sm font-semibold text-white mb-2">
            Debug
        </p>
        <dl class="space-y-2">
            <DebugItem
                title="image_inventory"
                :content="selected.image_inventory || 'N/A'"
            />

            <DebugItem
                title="use valve's CDN image"
                :content="
                    selected.image.includes('githubusercontent') ? 'No' : 'Yes'
                "
            />

            <DebugItem
                v-if="selected.image.includes('githubusercontent')"
                title="image"
                :content="selected.image || 'N/A'"
            />

            <DebugItem
                title="Raw item data"
                has-toggle
            >
                <div class="overflow-x-auto text-xs mt-1">
                    <RawDataTable :value="rawItemData" />
                </div>
            </DebugItem>
        </dl>
    </div>
</template>

<script setup lang="ts">
import { useDebug } from "../composables/useDebug"
import DebugItem from "./DebugItem.vue"
import RawDataTable from "./RawDataTable.vue"

const props = defineProps({
    selected: {
        type: Object,
        required: true
    },
    rawItemData: {
        type: Object,
        required: true
    }
})

const { isDebugMode } = useDebug()
</script>
