<template>
    <div
        v-for="index in numberItems"
        :key="`skeleton-${index}`"
        class="flex flex-col min-h-[10rem]"
    >
        <div class="block rounded-md animate-pulse h-5/6 bg-black-300" />
        <div class="bg-black-300 rounded-md h-1/6 mt-1.5 animate-pulse" />
    </div>
</template>

<script setup lang="ts">
withDefaults(
    defineProps<{
        numberItems?: number
    }>(),
    {
        numberItems: 30
    }
)
</script>
