<template>
    <div class="relative flex-1 w-full">
        <SearchBar
            :query="search"
            :scrolled-down="y > 40"
            :total="itemsCount"
            :loading="loading"
            :has-filters="hasFilters"
            @input="$emit('set-query', $event)"
            @open-filters="$emit('open-filters')"
        />
        <div
            ref="el"
            class="grid w-full gap-3 p-4 px-5 pb-32 mx-auto overflow-y-scroll h-dvh items-grid-small md:items-grid"
        >
            <ItemCard
                v-for="item in items"
                :id="item.id"
                :key="item.id"
                :name="item.name"
                :image="item.image"
                :souvenir="item?.souvenir ?? false"
                :stattrak="item?.stattrak ?? false"
                :rare="item?.rare ?? false"
                :genuine="item.name.includes('Genuine')"
                @show="$emit('select', item.id)"
            />
            <ItemsSkeleton v-if="loading" />
            <div
                v-if="!loading"
                v-element-visibility="onElementVisibility"
                class="py-10"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useScroll } from "@vueuse/core"
import { vElementVisibility } from "@vueuse/components"
import SearchBar from "./SearchBar.vue"
import ItemCard from "./ItemCard.vue"
import ItemsSkeleton from "./ItemsSkeleton.vue"

withDefaults(
    defineProps<{
        items: any[]
        itemsCount: number
        loading: boolean
        search: string
        hasFilters?: boolean
    }>(),
    {
        hasFilters: false
    }
)

const emit = defineEmits(["set-query", "select", "load-more", "open-filters"])

const el = ref<HTMLElement | null>(null)
const { y } = useScroll(el)
const isVisible = ref(false)

function onElementVisibility(state: boolean) {
    isVisible.value = state

    if (state === true) {
        emit("load-more")
    }
}
</script>
