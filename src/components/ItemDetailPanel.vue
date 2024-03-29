<template>
    <div
        v-if="itemDetailStore.selected"
        class="h-dvh md:border-l-2 border-black-300 md:w-80 xl:w-[30rem] flex flex-col absolute inset-0 md:relative bg-black-400"
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
                    class="object-scale-down w-full h-[16rem] rounded-md bg-black-300/80 bg-[url('/img/graph-paper.svg')]"
                    :class="{
                        'p-2': !itemDetailStore.selected.id.includes('agent-')
                    }"
                    :src="itemDetailStore.selected.image"
                    :alt="itemDetailStore.selected.name"
                >
            </div>

            <div class="py-3">
                <p
                    v-element-visibility="onNameVisibility"
                    class="col-span-8"
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
                <a
                    v-if="itemDetailStore.selected.market_hash_name"
                    :href="`https://steamcommunity.com/market/listings/730/${itemDetailStore.selected.market_hash_name}`"
                    class="relative p-3 text-center rounded-md bg-black-300 text-black-100"
                    target="_blank"
                >
                    <div
                        class="absolute top-0 bottom-0 left-0 flex items-center px-3"
                    >
                        <LinkIcon class="w-6 h-6 text-gray-500" />
                    </div>

                    Steam Community Market
                </a>

                <template v-if="itemDetailStore.selected.wears.length">
                    <div
                        class="overflow-hidden divide-y-4 rounded-md divide-black-200/10"
                    >
                        <div class="divide-y bg-black-300 divide-black-200/10">
                            <button
                                v-for="(item, index) of itemDetailStore.selected
                                    .wears"
                                :key="item.id"
                                class="flex w-full gap-4 p-3"
                                :class="{
                                    'bg-black-200/30':
                                        generateIdByWear(index) ===
                                        itemDetailStore.selected.id
                                }"
                                @click="
                                    itemDetailStore.getItemDetails(
                                        generateIdByWear(index)
                                    )
                                "
                            >
                                <div
                                    class="flex items-center justify-between w-full"
                                >
                                    <p class="text-sm">
                                        <span
                                            class="font-bold text-black-100"
                                        >{{ item.name }}</span>
                                    </p>

                                    <p class="text-white">
                                        {{ getItemSteamPriceByWear(index) }}
                                    </p>
                                </div>
                            </button>
                        </div>
                        <div
                            v-if="itemDetailStore.selected.skin_stattrak"
                            class="divide-y bg-black-300 divide-black-200/10"
                        >
                            <button
                                v-for="(item, index) of itemDetailStore.selected
                                    .wears"
                                :key="item.id"
                                class="flex w-full gap-4 p-3"
                                :class="{
                                    'bg-black-200/30':
                                        generateIdByWear(index, 'st') ===
                                        itemDetailStore.selected.id
                                }"
                                @click="
                                    itemDetailStore.getItemDetails(
                                        generateIdByWear(index, 'st')
                                    )
                                "
                            >
                                <div
                                    class="flex items-center justify-between w-full"
                                >
                                    <p class="text-sm">
                                        <span class="text-[#cf6a32] mr-2">StatTrak™</span>
                                        <span
                                            class="font-bold text-black-100"
                                        >{{ item.name }}</span>
                                    </p>

                                    <p class="text-white">
                                        {{
                                            getItemSteamPriceByWear(index, "st")
                                        }}
                                    </p>
                                </div>
                            </button>
                        </div>
                        <div
                            v-if="itemDetailStore.selected.skin_souvenir"
                            class="divide-y bg-black-300 divide-black-200/10"
                        >
                            <button
                                v-for="(item, index) of itemDetailStore.selected
                                    .wears"
                                :key="item.id"
                                class="flex w-full gap-4 p-3"
                                :class="{
                                    'bg-black-200/30':
                                        generateIdByWear(index, 'so') ===
                                        itemDetailStore.selected.id
                                }"
                                @click="
                                    itemDetailStore.getItemDetails(
                                        generateIdByWear(index, 'so')
                                    )
                                "
                            >
                                <div
                                    class="flex items-center justify-between w-full"
                                >
                                    <p class="text-sm">
                                        <span class="text-[#ffd700] mr-2">Souvenir</span>
                                        <span
                                            class="font-bold text-black-100"
                                        >{{ item.name }}</span>
                                    </p>

                                    <p class="text-white">
                                        {{
                                            getItemSteamPriceByWear(index, "so")
                                        }}
                                    </p>
                                </div>
                            </button>
                        </div>
                    </div>
                </template>

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
                                itemDetailStore.getItemDetails(
                                    item.id.includes('skin')
                                        ? `${item.id}_0`
                                        : item.id
                                )
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
                                itemDetailStore.getItemDetails(
                                    item.id.includes('skin')
                                        ? `${item.id}_0`
                                        : item.id
                                )
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
import { XMarkIcon, LinkIcon } from "@heroicons/vue/24/outline"
import { vElementVisibility } from "@vueuse/components"
import { usePricesStore } from "../stores/prices"

const itemDetailStore = useItemDetailStore()
const { getItemSteamPrice } = usePricesStore()

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
        return "text-white"
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

    return "text-white"
})

function generateIdByWear(index: number, type: string = "") {
    const id = itemDetailStore.selected?.id.split("_")[0]
    if (!type) {
        return `${id}_${index}`
    }

    if (type === "so") {
        return `${id}_${index}_so`
    }

    if (type === "st") {
        return `${id}_${index}_st`
    }

    return ""
}

function getItemSteamPriceByWear(index: number, type: string = "") {
    const id = itemDetailStore.selected?.id.split("_")[0]
    let price = ""

    if (!type) {
        const name = itemDetailStore.items[`${id}_${index}`].name
        price = getItemSteamPrice(name)
    }

    if (type === "so") {
        const name = itemDetailStore.items[`${id}_${index}_so`].name
        price = getItemSteamPrice(name)
    }

    if (type === "st") {
        const name = itemDetailStore.items[`${id}_${index}_st`].name
        price = getItemSteamPrice(name)
    }

    return price ? `$ ${price}` : ""
}
</script>
