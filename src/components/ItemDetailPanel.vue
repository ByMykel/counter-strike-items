<template>
    <div
        v-if="itemDetailStore.selected"
        class="h-dvh border-l-2 border-black-300 md:w-80 xl:w-[30rem] flex flex-col absolute inset-0 md:relative z-50 bg-black-400"
    >
        <div
            class="flex items-center w-full h-[69px] border-b-2 border-black-300 px-4 sticky top-0 text-black-100"
        >
            <button
                class="disabled:cursor-wait"
                @click="itemDetailStore.deleteItem()"
            >
                <XMarkIcon class="w-6 h-6 text-white" />
            </button>
            <p
                v-show="showItemName"
                class="ml-4 truncate text-black-100"
            >
                {{ itemDetailStore.selected?.name }}
            </p>
        </div>

        <div
            v-if="itemDetailStore.selected"
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
                    :class="itemNameColor"
                >
                    {{ itemDetailStore.selected.name }}
                </p>

                <!-- eslint-disable vue/no-v-html -->
                <p
                    class="py-2 text-sm text-black-100"
                    v-html="description"
                />
                <!--eslint-enable-->
            </div>

            <div class="flex flex-col gap-5">
                <div
                    v-if="itemDetailStore.selected.collections.length"
                    class="overflow-hidden divide-y rounded-md"
                >
                    <div class="divide-y bg-black-300 divide-black-200/10">
                        <div
                            v-for="item of itemDetailStore.selected.collections"
                            :key="item.id"
                            class="flex gap-4 p-3 cursor-pointer"
                            @click="itemDetailStore.getItemDetails(item.id)"
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
                            @click="itemDetailStore.getItemDetails(item.id)"
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
                    v-if="itemDetailStore.selected.contains.length"
                    class="overflow-hidden divide-y rounded-md"
                >
                    <div class="divide-y bg-black-300 divide-black-200/10">
                        <div
                            v-for="item of itemDetailStore.selected.contains"
                            :key="item.id"
                            class="flex gap-4 p-3 cursor-pointer"
                            @click="
                                itemDetailStore.getItemDetails(`${item.id}_0`)
                            "
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
                    class="overflow-hidden divide-y rounded-md divide-black-200/10"
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
                            v-for="item of itemDetailStore.selected
                                .containsRare"
                            :key="item.id"
                            class="flex gap-4 p-3 cursor-pointer"
                            @click="
                                itemDetailStore.getItemDetails(`${item.id}_0`)
                            "
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
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import { useItemDetailStore } from "../stores/ItemDetail"
import { XMarkIcon } from "@heroicons/vue/24/outline"
import { vElementVisibility } from "@vueuse/components"

const itemDetailStore = useItemDetailStore()

const showItemName = ref(false)
const showRareItems = ref(false)

function onNameVisibility(state: boolean) {
    showItemName.value = !state
}

const description = computed(() => {
    if (!itemDetailStore.selected?.description) {
        return ""
    }

    // Remove the `\n\n`
    return itemDetailStore.selected.description.replace(/\\n\\n/g, " ")
})

// TODO: Improve this.
const itemNameColor = computed(() => {
    if (!itemDetailStore.selected) {
        return ""
    }

    if (itemDetailStore.selected.name.includes("Souvenir")) {
        return "text-[#ffd700]"
    }

    if (itemDetailStore.selected.name.includes("Genuine")) {
        return "text-[#4d7455]"
    }

    if (itemDetailStore.selected.name.includes("★ ")) {
        return "text-[#8650ac]"
    }

    if (itemDetailStore.selected.name.includes("StatTrak")) {
        return "text-[#cf6a32]"
    }

    return ""
})
</script>
