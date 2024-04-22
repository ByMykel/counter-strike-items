<template>
    <div
        v-if="items.length"
        class="overflow-hidden divide-y rounded-md divide-black-200/10"
    >
        <template v-if="showToggle">
            <div
                v-if="show"
                class="py-2 text-center cursor-pointer text-black-100 bg-black-300 hover:bg-black-300/70"
                @click="show = false"
            >
                {{ toggleTextDisplayed }}
            </div>
            <div
                v-else
                class="py-2 text-center cursor-pointer text-black-100 bg-black-300 hover:bg-black-300/70"
                @click="show = true"
            >
                {{ toggleTextClosed }}
            </div>
        </template>
        <div
            v-if="!showToggle || show"
            class="divide-y bg-black-300 divide-black-200/10"
        >
            <div
                v-for="item of items"
                :key="item.id"
                class="flex items-center gap-4 p-2 cursor-pointer"
                :class="{
                    'bg-black-200/30': item.id === selectedItemId
                }"
                @click="$emit('get-item-details', item.id)"
            >
                <img
                    class="object-contain w-16"
                    :src="item.image"
                    :alt="item.name"
                >
                <div>
                    <p class="text-sm font-bold text-black-100">
                        {{ item.name }}
                    </p>
                    <p
                        v-if="item.rarity"
                        class="text-sm"
                        :style="{ color: item.rarity.color }"
                    >
                        {{ item.rarity.name }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

defineProps<{
    items: {
        id: string
        name: string
        image: string
        rarity?: {
            name: string
            color: string
        }
    }[]
    selectedItemId?: string
    showToggle?: boolean
    toggleTextClosed?: string
    toggleTextDisplayed?: string
}>()

defineEmits(["get-item-details"])

const show = ref(false)
</script>
