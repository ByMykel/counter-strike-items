<template>
    <div>
        <dt
            class="text-sm font-semibold text-white flex items-center justify-between"
        >
            {{ title }}
            <button
                v-if="hasToggle"
                class="text-xs px-2 py-1 bg-black-200 rounded hover:bg-black-100 transition-colors"
                @click="showContent = !showContent"
            >
                {{ showContent ? "Hide" : "Show" }}
            </button>
        </dt>
        <dd
            v-if="!hasToggle || showContent"
            class="text-sm text-black-100 break-all"
        >
            <slot>
                {{ content }}
            </slot>
        </dd>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        default: ""
    },
    hasToggle: {
        type: Boolean,
        default: false
    }
})

const showContent = ref(false)
</script>
