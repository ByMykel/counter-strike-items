<template>
    <div
        class="h-dvh md:border-l-2 border-black-300 md:w-80 xl:w-[30rem] flex flex-col absolute inset-0 md:relative bg-black-400"
    >
        <div
            class="flex items-center w-full h-[69px] border-b-2 border-black-300 px-4 sticky top-0 text-black-100"
        >
            <p
                v-show="showItemName"
                class="ml-4 mr-5 truncate text-black-100"
            >
                {{ selected.name }}
            </p>
            <button
                class="ml-auto disabled:cursor-wait"
                @click="$emit('delete-item')"
            >
                <XMarkIcon class="w-6 h-6 text-white" />
            </button>
        </div>

        <div class="h-[calc(100vh-69px)] px-4 py-4 overflow-x-hidden">
            <div
                v-if="selected.specialNotes.length"
                class="mb-4 space-y-3"
            >
                <a
                    v-for="(note, index) of selected.specialNotes"
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

            <div
                class="relative bg-black-300/80 bg-[url('/img/graph-paper.svg')] rounded-md group"
            >
                <ItemsPriceChart
                    v-if="selected.market_hash_name"
                    class="absolute opacity-0 top-0 right-0 h-[16rem] left-0 group-hover:opacity-100 duration-200 transition-all rounded-md"
                    :price-history="selected.price_history"
                />
                <img
                    class="object-scale-down w-full h-[16rem] duration-200 transition-all relative z-[1]"
                    :class="{
                        'p-2': !selected.id.includes('agent-'),
                        'group-hover:pointer-events-none group-hover:opacity-0':
                            selected.market_hash_name
                    }"
                    :src="selected.image"
                    :alt="selected.name"
                >
            </div>

            <div class="py-3">
                <p
                    v-element-visibility="onNameVisibility"
                    class="col-span-8 text-white"
                >
                    {{ selected.name }}
                </p>

                <!-- eslint-disable vue/no-v-html -->
                <p
                    class="py-2 text-sm text-black-100"
                    v-html="selected.description"
                />
                <!--eslint-enable-->
            </div>

            <div class="flex flex-col gap-5">
                <a
                    v-if="selected.market_hash_name"
                    :href="`https://steamcommunity.com/market/listings/730/${selected.market_hash_name}`"
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

                <div
                    v-if="
                        getPrice(selected.market_hash_name)?.steam &&
                            !selected.id.includes('skin')
                    "
                    class="text-center divide-y rounded-md bg-black-300 text-black-100 divide-black-200/10"
                >
                    <div
                        v-for="price of itemPrices"
                        :key="price.name"
                        class="grid grid-cols-2 p-3"
                    >
                        <div class="font-semibold text-left text-black-100">
                            {{ price.name }}
                        </div>
                        <div class="text-right text-white">
                            {{ price.price }}
                        </div>
                    </div>
                </div>

                <template v-if="selected.wears.length">
                    <div
                        class="overflow-hidden divide-y-4 rounded-md divide-black-200/10"
                    >
                        <div class="divide-y bg-black-300 divide-black-200/10">
                            <button
                                v-for="(item, index) of selected.wears"
                                :key="item.id"
                                class="flex w-full gap-4 p-3"
                                :class="{
                                    'bg-black-200/30':
                                        generateIdByWear(index) === selected.id
                                }"
                                @click="
                                    $emit(
                                        'get-item-details',
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
                            v-if="selected.skin_stattrak"
                            class="divide-y bg-black-300 divide-black-200/10"
                        >
                            <button
                                v-for="(item, index) of selected.wears"
                                :key="item.id"
                                class="flex w-full gap-4 p-3"
                                :class="{
                                    'bg-black-200/30':
                                        generateIdByWear(index, 'st') ===
                                        selected.id
                                }"
                                @click="
                                    $emit(
                                        'get-item-details',
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
                            v-if="selected.skin_souvenir"
                            class="divide-y bg-black-300 divide-black-200/10"
                        >
                            <button
                                v-for="(item, index) of selected.wears"
                                :key="item.id"
                                class="flex w-full gap-4 p-3"
                                :class="{
                                    'bg-black-200/30':
                                        generateIdByWear(index, 'so') ===
                                        selected.id
                                }"
                                @click="
                                    $emit(
                                        'get-item-details',
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

                <ItemDetailList
                    :items="selected.collections"
                    @get-item-details="$emit('get-item-details', $event)"
                />

                <ItemDetailList
                    :items="selected.crates"
                    :show-toggle="selected.crates?.length > 4"
                    :toggle-text-closed="`Show ${selected.crates.length} crates`"
                    :toggle-text-displayed="`Hide crates`"
                    @get-item-details="$emit('get-item-details', $event)"
                />

                <ItemDetailList
                    :items="selected.contains"
                    @get-item-details="
                        $emit(
                            'get-item-details',
                            $event.includes('skin') ? `${$event}_0` : $event
                        )
                    "
                />

                <ItemDetailList
                    :items="selected.containsRare"
                    :show-toggle="true"
                    :toggle-text-closed="`Show ${selected.containsRare.length} rate special items`"
                    :toggle-text-displayed="`Hide rate special items`"
                    @get-item-details="
                        $emit(
                            'get-item-details',
                            $event.includes('skin') ? `${$event}_0` : $event
                        )
                    "
                />

                <ItemDetailList
                    :items="selected.variants"
                    :selected-item-id="selected.id"
                    @get-item-details="$emit('get-item-details', $event)"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import { XMarkIcon, LinkIcon } from "@heroicons/vue/24/outline"
import { vElementVisibility } from "@vueuse/components"
import { usePricesStore } from "../stores/prices"
import ItemsPriceChart from "../components/ItemsPriceChart.vue"
import ItemDetailList from "../components/ItemDetailList.vue"

const props = defineProps({
    selected: {
        type: Object,
        required: true
    },
    items: {
        type: Object,
        required: true
    }
})

defineEmits(["delete-item", "get-item-details"])

const { getPrice, getItemSteamPrice } = usePricesStore()

const showItemName = ref(false)

const itemPrices = computed(() => {
    const steamPrice = getPrice(props.selected.market_hash_name)?.steam

    if (!steamPrice) return []

    return [
        steamPrice.last_24h && {
            name: "Last 24h",
            price: `€ ${steamPrice.last_24h.toFixed(2)}`
        },
        steamPrice.last_7d && {
            name: "Last 7 days",
            price: `€ ${steamPrice.last_7d.toFixed(2)}`
        },
        steamPrice.last_30d && {
            name: "Last 30 days",
            price: `€ ${steamPrice.last_30d.toFixed(2)}`
        },
        steamPrice.last_90d && {
            name: "Last 90 days",
            price: `€ ${steamPrice.last_90d.toFixed(2)}`
        }
    ].filter(Boolean)
})

function onNameVisibility(state: boolean) {
    showItemName.value = !state
}

function generateIdByWear(index: number, type: string = "") {
    const id = props.selected.id.split("_")[0]
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
    const id = props.selected.id.split("_")[0]
    let price = ""

    if (!type) {
        const name = props.items[`${id}_${index}`].name
        price = getItemSteamPrice(name)
    }

    if (type === "so") {
        const name = props.items[`${id}_${index}_so`].name
        price = getItemSteamPrice(name)
    }

    if (type === "st") {
        const name = props.items[`${id}_${index}_st`].name
        price = getItemSteamPrice(name)
    }

    return price ? `€ ${price}` : ""
}
</script>
