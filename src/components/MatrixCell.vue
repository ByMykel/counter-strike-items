<template>
    <div
        v-if="cellData"
        class="flex flex-col gap-2 items-center justify-center h-full"
    >
        <div class="flex flex-wrap gap-1 justify-center">
            <template v-if="showOnlyFirstItem">
                <button
                    v-if="cellData.items.length > 0"
                    :key="`${row}-${column}-${cellData.items[0].id}`"
                    class="group relative flex flex-col items-center"
                    @click="$emit('select-item', cellData.items[0].id)"
                >
                    <img
                        :src="formatImageUrl(cellData.items[0].image)"
                        :alt="cellData.items[0].name"
                        draggable="false"
                        class="w-24 h-24 object-contain rounded hover:opacity-80 transition-opacity select-none"
                        @dragstart.prevent
                    >
                    <div
                        class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black-500 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-30 max-w-[200px] text-center"
                    >
                        {{ cellData.items[0].name }}
                    </div>
                </button>
            </template>
            <template v-else>
                <button
                    v-for="item in cellData.items"
                    :key="`${row}-${column}-${item.id}`"
                    class="group relative flex flex-col items-center"
                    @click="$emit('select-item', item.id)"
                >
                    <img
                        :src="formatImageUrl(item.image)"
                        :alt="item.name"
                        draggable="false"
                        class="w-16 h-16 object-contain rounded hover:opacity-80 transition-opacity select-none"
                        @dragstart.prevent
                    >
                    <div
                        class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black-500 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-30 max-w-[200px] text-center"
                    >
                        {{ item.name }}
                    </div>
                </button>
            </template>
        </div>
        <div
            v-if="showCrates && cellData.crates"
            class="flex flex-wrap gap-1 justify-center"
        >
            <button
                v-for="crate in cellData.crates"
                :key="`${row}-${column}-crate-${crate.id}`"
                class="group relative"
                @click.stop="$emit('select-crate', crate.id)"
            >
                <img
                    :src="formatCrateImageUrl(crate.image)"
                    :alt="crate.name"
                    draggable="false"
                    class="w-8 h-8 object-contain rounded hover:opacity-80 transition-opacity select-none"
                    @dragstart.prevent
                >
                <div
                    class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black-500 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-30"
                >
                    {{ crate.name }}
                </div>
            </button>
        </div>
    </div>
    <span
        v-else
        class="text-black-300 text-xs"
    >—</span>
</template>

<script setup lang="ts">
import type { CellData } from "../services/SpecialItemsMatrixService"

defineProps<{
    cellData: CellData | null
    row: string
    column: string
    showOnlyFirstItem?: boolean
    showCrates?: boolean
}>()

defineEmits<{
    "select-item": [itemId: string]
    "select-crate": [crateId: string]
}>()

function formatImageUrl(image: string): string {
    if (
        image?.includes("cdn.steamstatic") ||
        image?.includes("raw.githubusercontent")
    ) {
        return image
    }
    return image + "/62fx62fdpx2x"
}

function formatCrateImageUrl(image: string): string {
    if (
        image?.includes("cdn.steamstatic") ||
        image?.includes("raw.githubusercontent")
    ) {
        return image
    }
    return image + "/32fx32fdpx2x"
}
</script>
