<template>
    <div
        class="h-dvh md:border-l-2 border-black-300 md:w-80 xl:w-[30rem] flex flex-col absolute inset-0 md:relative bg-black-400 z-50"
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

            <div class="py-3 space-y-2">
                <p
                    v-element-visibility="onNameVisibility"
                    class="col-span-8 text-white"
                >
                    {{ selected.name }}
                </p>

                <!-- eslint-disable vue/no-v-html -->
                <p
                    class="text-sm text-black-100"
                    v-html="selected.description"
                />
                <!--eslint-enable-->

                <a
                    v-if="selected.style"
                    :href="selected.style.url"
                    class="flex ites-center text-black-100 w-full underline"
                    target="_blank"
                >
                    Finish Style: {{ selected.style.name }}
                </a>
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

                    {{ $t("common_scm") }}
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
                    :toggle-text-closed="
                        $t('common_show_crates', {
                            number: selected.crates.length
                        })
                    "
                    :toggle-text-displayed="$t('common_hide_crates')"
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
                    :toggle-text-closed="
                        $t('common_show_rare', {
                            number: selected.containsRare.length
                        })
                    "
                    :toggle-text-displayed="$t('common_hide_rare')"
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
import { useI18n } from "petite-vue-i18n"
import { getCurrentCurrency } from "../utils"

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

const { getPrice, getItemSteamPrice, getItemSteamPriceInCurrency } =
    usePricesStore()
const { t } = useI18n()

const showItemName = ref(false)

const itemPrices = computed(() => {
    const steamPrice = getPrice(props.selected.market_hash_name)?.steam
    const currency = getCurrentCurrency()

    if (!steamPrice) return []

    return [
        steamPrice.last_24h && {
            name: t("common_last_24h"),
            price: getItemSteamPriceInCurrency(steamPrice.last_24h, currency)
        },
        steamPrice.last_7d && {
            name: t("common_last_7d"),
            price: getItemSteamPriceInCurrency(steamPrice.last_7d, currency)
        },
        steamPrice.last_30d && {
            name: t("common_last_30d"),
            price: getItemSteamPriceInCurrency(steamPrice.last_30d, currency)
        },
        steamPrice.last_90d && {
            name: t("common_last_90d"),
            price: getItemSteamPriceInCurrency(steamPrice.last_90d, currency)
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
    debugger
    const id = props.selected.id.split("_")[0]
    let price = null

    if (!type) {
        const name = props.items[`${id}_${index}`].market_hash_name
        price = getItemSteamPrice(name)
    }

    if (type === "so") {
        const name = props.items[`${id}_${index}_so`].market_hash_name
        price = getItemSteamPrice(name)
    }

    if (type === "st") {
        const name = props.items[`${id}_${index}_st`].market_hash_name
        price = getItemSteamPrice(name)
    }

    if (price) {
        return getItemSteamPriceInCurrency(price, getCurrentCurrency())
    } else {
        return ""
    }
}
</script>
