<template>
    <div
        v-if="itemDetailStore.loading || itemDetailStore.selected"
        class="h-dvh border-l-2 border-black-300 md:w-80 xl:w-[30rem] flex flex-col absolute inset-0 md:relative z-50 bg-black-400"
    >
        <div
            class="flex items-center w-full h-[69px] border-b-2 border-black-300 px-4 sticky top-0 text-black-100"
        >
            <button
                :disabled="itemDetailStore.loading"
                class="disabled:cursor-wait"
                @click="itemDetailStore.deleteItem()"
            >
                <ChevronLeftIcon
                    v-if="itemDetailStore.previous.length"
                    class="w-6 h-6 text-white"
                />
                <XMarkIcon
                    v-else
                    class="w-6 h-6 text-white"
                />
            </button>
            <p
                v-show="!itemDetailStore.loading && showItemName"
                class="ml-4 truncate text-black-100"
            >
                {{ itemDetailStore.selected?.name }}
            </p>
        </div>

        <div
            v-if="!itemDetailStore.loading && itemDetailStore.selected"
            class="h-[calc(100vh-69px)] px-4 py-4 overflow-x-hidden"
        >
            <div
                v-if="itemDetailStore.selected.specialNotes.length"
                class="mb-4 space-y-3"
            >
                <a
                    v-for="(note, index) of itemDetailStore.selected
                        .specialNotes"
                    :key="`special-note-${index}`"
                    :href="note.source"
                    target="_blank"
                >
                    <div
                        class="p-3 text-sm text-yellow-800 bg-yellow-300 rounded-md"
                    >
                        {{ note.text }}
                    </div>
                </a>
            </div>

            <div>
                <img
                    class="object-contain w-full h-[16rem] px-12 py-6 rounded-md bg-black-300/80 bg-[url('/img/graph-paper.svg')]"
                    :src="itemDetailStore.selected.image"
                    :alt="itemDetailStore.selected.name"
                >
            </div>

            <div class="py-3">
                <p
                    v-element-visibility="onNameVisibility"
                    class="col-span-8 text-white"
                >
                    {{ itemDetailStore.selected.name }}
                </p>
                <p class="py-2 text-sm text-black-100">
                    {{ itemDetailStore.selected.description }}
                </p>
            </div>

            <div
                v-if="itemDetailStore.selected.contains.length"
                class="overflow-hidden divide-y rounded-md"
            >
                <div class="divide-y bg-black-300 divide-black-200/10">
                    <div
                        v-for="item of itemDetailStore.selected.contains"
                        :key="item.id"
                        class="flex gap-4 p-3 cursor-pointer"
                        @click="itemDetailStore.getItemDetails(item.id, true)"
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
                                class="text-sm"
                                :style="{ color: item.rarity.color }"
                            >
                                {{ item.rarity.name }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div
                v-if="itemDetailStore.selected.containsRare.length"
                class="mt-5 overflow-hidden divide-y rounded-md divide-black-200/10"
            >
                <div
                    v-if="!showRareItems"
                    class="py-2 text-center cursor-pointer text-black-100 bg-black-300 hover:bg-black-300/70"
                    @click="showRareItems = true"
                >
                    Show
                    {{ itemDetailStore.selected.containsRare.length }} Rare
                    Special Items
                </div>
                <div
                    v-if="showRareItems"
                    class="py-2 text-center cursor-pointer text-black-100 bg-black-300 hover:bg-black-300/70"
                    @click="showRareItems = false"
                >
                    Hide Rare Special Items
                </div>
                <div
                    v-if="showRareItems"
                    class="divide-y bg-black-300 divide-black-200/10"
                >
                    <div
                        v-for="item of itemDetailStore.selected.containsRare"
                        :key="item.id"
                        class="flex gap-4 p-3 cursor-pointer"
                        @click="itemDetailStore.getItemDetails(item.id, true)"
                    >
                        <img
                            class="object-contain w-16"
                            :src="item.image"
                            :alt="item.name"
                        >
                        <div>
                            <p class="text-sm font-bold text-yellow-400">
                                {{ item.name
                                }}{{
                                    item.phase
                                        ? `
                                (${item.phase})`
                                        : ""
                                }}
                            </p>
                            <p
                                class="text-sm"
                                :style="{ color: item.rarity.color }"
                            >
                                {{ item.rarity.name }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div
                v-if="itemDetailStore.selected.collections.length"
                class="mb-5 overflow-hidden divide-y rounded-md"
            >
                <div class="divide-y bg-black-300 divide-black-200/10">
                    <div
                        v-for="item of itemDetailStore.selected.collections"
                        :key="item.id"
                        class="flex gap-4 p-3 cursor-pointer"
                        @click="itemDetailStore.getItemDetails(item.id, true)"
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
                        </div>
                    </div>
                </div>
            </div>

            <div
                v-if="itemDetailStore.selected.crates.length"
                class="overflow-hidden divide-y rounded-md"
            >
                <div class="divide-y bg-black-300 divide-black-200/10">
                    <div
                        v-for="item of itemDetailStore.selected.crates"
                        :key="item.id"
                        class="flex gap-4 p-3 cursor-pointer"
                        @click="itemDetailStore.getItemDetails(item.id, true)"
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
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div
            v-if="itemDetailStore.loading"
            class="flex items-center justify-center h-[70vh]"
        >
            <div role="status">
                <svg
                    aria-hidden="true"
                    class="w-8 h-8 mr-2 text-black-300 animate-spin fill-blue-500"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                    />
                    <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                    />
                </svg>
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useItemDetailStore } from "../stores/ItemDetail"
import { XMarkIcon } from "@heroicons/vue/24/outline"
import { ChevronLeftIcon } from "@heroicons/vue/24/outline"
import { vElementVisibility } from "@vueuse/components"

const itemDetailStore = useItemDetailStore()

const showItemName = ref(false)
const showRareItems = ref(false)

function onNameVisibility(state: boolean) {
    showItemName.value = !state
}
</script>
