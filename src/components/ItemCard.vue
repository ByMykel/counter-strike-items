<template>
    <div class="flex flex-col" @click="selectItem">
        <div class="relative block h-[12rem]  p-1 overflow-hidden border-2 border-transparent rounded-md outline-none cursor-pointer focus:border-blue-500 hover:border-blue-500"
            :class="{
                '!border-blue-500': selectedItemId === item.id
            }">

            <div class="absolute z-10 flex gap-1 top-2 right-2">
                <div v-for="label in labels" :key="label.attribute"
                    class="bg-black-200 rounded-md text-xs text-white px-1 py-0.5">
                    {{ item[label.attribute] }}
                </div>
            </div>
            <img class="object-contain w-full h-full px-12 py-4 rounded-md bg-black-300/80 bg-[url('/img/graph-paper.svg')]" :src="item.image"
                :alt="item.name" />
        </div>
        <div>
            <p class="text-sm truncate px-0.5 mt-1.5 text-white" :title="item.name">
                {{ item.name }}
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue"

type Item = {
    id: string;
    image: string;
    name: string;
    // phase?: string;
    // wear?: string;
    [key: string]: any;
};

const props = defineProps<{
    item: Item;
    selectedItemId: string | null;
}>();

const emit = defineEmits(['input', 'selected'])

const attributes = ["phase", "wear"];

const labels = computed(() => {
    return attributes.map((attribute: string) => ({
        attribute,
        visible: props.item?.[attribute] != null
    })).filter(label => label.visible)
})

function selectItem() {
    if(props.item.id !== props.selectedItemId) {
        emit('selected', props.item.id)
    }
}
</script>