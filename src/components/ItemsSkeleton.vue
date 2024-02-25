<template>
    <div
        v-for="index in numberItems"
        :key="`skeleton-${index}`"
        class="flex flex-col"
    >
        <div
            class="block relative rounded-md p-0.5 border-transparent animate-pulse overflow-hidden border-2 min-h-[10rem] bg-black-300 focus:border-blue-500 hover:border-blue-500 outline-none h-full cursor-pointer"
        />
        <div class="bg-black-300 rounded-md h-[1.7rem] mt-1.5 animate-pulse" />
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
