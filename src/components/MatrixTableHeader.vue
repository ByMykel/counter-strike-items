<template>
    <thead
        class="sticky top-0 z-10 bg-black-400"
        style="box-shadow: 0 2px 0 #212121"
    >
        <tr>
            <th
                class="bg-black-400 border-r-2 border-black-300 px-3 py-2 w-[250px]"
            />
            <!-- Spacer cells for columns before visible range -->
            <th
                v-if="visibleColStart > 0"
                :style="{
                    width: `${visibleColStart * COLUMN_WIDTH}px`
                }"
            />
            <!-- Visible columns -->
            <th
                v-for="column in visibleColumns"
                :key="column"
                class="border-r border-black-300 px-3 py-2 w-[180px] text-center"
            >
                <span class="text-xs text-black-100 break-words">{{
                    column
                }}</span>
            </th>
            <!-- Spacer cells for columns after visible range -->
            <th
                v-if="visibleColEnd < totalColumns - 1"
                :style="{
                    width: `${(totalColumns - visibleColEnd - 1) * COLUMN_WIDTH}px`
                }"
            />
        </tr>
    </thead>
</template>

<script setup lang="ts">
defineProps<{
    visibleColumns: string[]
    visibleColStart: number
    visibleColEnd: number
    totalColumns: number
}>()

const COLUMN_WIDTH = 180
</script>
