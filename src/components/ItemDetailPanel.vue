<template>
    <div
        class="h-dvh md:border-l-2 border-black-300 md:w-80 flex-shrink-0 xl:w-[30rem] flex flex-col absolute inset-0 md:relative bg-black-400 z-50"
    >
        <div
            class="flex items-center w-full h-[69px] border-b-2 border-black-300 px-4 sticky top-0 text-black-100"
        >
            <button
                v-if="hasHistory"
                class="mr-2 disabled:cursor-wait"
                @click="$emit('go-back')"
            >
                <ArrowLeftIcon class="w-6 h-6 text-white" />
            </button>
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

        <div
            ref="scrollContainer"
            class="h-[calc(100vh-69px)] px-4 py-4 overflow-x-hidden overflow-y-auto"
        >
            <DebugPanel
                :selected="selected"
                :raw-item-data="items[selected.id]"
            />
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
                class="relative bg-black-300/80 bg-[url('../img/graph-paper.svg')] rounded-md"
            >
                <img
                    class="w-full h-[16rem] p-2"
                    :class="{
                        'object-scale-down': !selected.image?.endsWith('.svg')
                    }"
                    :src="selected.image"
                    :alt="selected.name"
                >
                <span
                    class="absolute bottom-2 right-2 text-sm font-semibold px-2 py-1 rounded bg-black-400/80"
                    :class="
                        formattedPrice ? 'text-green-400' : 'text-black-100'
                    "
                >
                    {{ priceLabel }}
                </span>
            </div>

            <div class="py-3 pb-4 space-y-2">
                <p
                    v-element-visibility="onNameVisibility"
                    class="col-span-8 text-white"
                >
                    {{ selected.name }}
                </p>

                <!-- eslint-disable vue/no-v-html -->
                <p
                    v-if="selected.description"
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
                <div class="flex flex-col gap-2">
                    <a
                        v-if="selected.market_hash_name"
                        :href="`https://steamcommunity.com/market/listings/730/${selected.market_hash_name}?l=english`"
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

                    <a
                        v-if="inspectLink"
                        :href="inspectLink"
                        class="relative p-3 text-center rounded-md bg-black-300 text-black-100"
                        target="_blank"
                    >
                        <div
                            class="absolute top-0 bottom-0 left-0 flex items-center px-3"
                        >
                            <EyeIcon class="w-6 h-6 text-gray-500" />
                        </div>

                        Inspect in Game
                    </a>
                </div>

                <template v-if="selected.wears.length">
                    <div
                        class="overflow-hidden divide-y-4 rounded-md divide-black-200/10"
                    >
                        <div
                            v-if="hasNormalWears"
                            class="divide-y bg-black-300 divide-black-200/10"
                        >
                            <button
                                v-for="(item, index) of selected.wears"
                                :key="item.id"
                                class="flex w-full gap-4 p-3"
                                :class="{
                                    'bg-black-200/30':
                                        generateIdByWear(Number(index)) ===
                                        selected.id
                                }"
                                @click="
                                    $emit(
                                        'get-item-details',
                                        generateIdByWear(Number(index))
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
                                    <span
                                        class="text-xs whitespace-nowrap ml-2"
                                        :class="
                                            getWearPrice(Number(index))
                                                ? 'text-green-400'
                                                : 'text-black-100'
                                        "
                                    >
                                        {{ getWearPrice(Number(index)) ?? "—" }}
                                    </span>
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
                                        generateIdByWear(
                                            Number(index),
                                            'st'
                                        ) === selected.id
                                }"
                                @click="
                                    $emit(
                                        'get-item-details',
                                        generateIdByWear(Number(index), 'st')
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
                                    <span
                                        class="text-xs whitespace-nowrap ml-2"
                                        :class="
                                            getWearPrice(Number(index), 'st')
                                                ? 'text-green-400'
                                                : 'text-black-100'
                                        "
                                    >
                                        {{
                                            getWearPrice(Number(index), "st") ??
                                                "—"
                                        }}
                                    </span>
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
                                        generateIdByWear(
                                            Number(index),
                                            'so'
                                        ) === selected.id
                                }"
                                @click="
                                    $emit(
                                        'get-item-details',
                                        generateIdByWear(Number(index), 'so')
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
                                    <span
                                        class="text-xs whitespace-nowrap ml-2"
                                        :class="
                                            getWearPrice(Number(index), 'so')
                                                ? 'text-green-400'
                                                : 'text-black-100'
                                        "
                                    >
                                        {{
                                            getWearPrice(Number(index), "so") ??
                                                "—"
                                        }}
                                    </span>
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
                    toggle-text-displayed="Hide crates"
                    @get-item-details="$emit('get-item-details', $event)"
                />

                <ItemDetailList
                    :items="selected.contains"
                    @get-item-details="getItemDetails($event)"
                />

                <ItemDetailList
                    :items="selected.containsRare"
                    :show-toggle="true"
                    :toggle-text-closed="`Show ${selected.containsRare.length} rare special items`"
                    toggle-text-displayed="Hide rare special items"
                    @get-item-details="getItemDetails($event)"
                />

                <ItemDetailList
                    :items="selected.variants"
                    :selected-item-id="selected.id"
                    @get-item-details="$emit('get-item-details', $event)"
                />

                <ItemDetailList
                    :items="selected.related_collectibles"
                    :selected-item-id="selected.id"
                    @get-item-details="$emit('get-item-details', $event)"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from "vue"
import {
    XMarkIcon,
    LinkIcon,
    EyeIcon,
    ArrowLeftIcon
} from "@heroicons/vue/24/outline"
import { vElementVisibility } from "@vueuse/components"
import ItemDetailList from "../components/ItemDetailList.vue"
import DebugPanel from "../components/DebugPanel.vue"
import { useInspect } from "../composables/useInspect"
import { useItemDetailStore } from "../stores/ItemDetail"
import { usePriceStore } from "../stores/prices"

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

const emit = defineEmits(["delete-item", "get-item-details", "go-back"])

const itemDetailStore = useItemDetailStore()
const priceStore = usePriceStore()
const hasHistory = computed(() => itemDetailStore.history.length > 0)
const formattedPrice = computed(() =>
    priceStore.getPrice(props.selected.market_hash_name)
)
const priceLabel = computed(() => {
    if (formattedPrice.value) return formattedPrice.value
    return priceStore.isMarketable(props.selected.market_hash_name)
        ? "No price available"
        : "Not marketable"
})

const showItemName = ref(false)
const scrollContainer = ref<HTMLElement | null>(null)

// Scroll to top when selected item changes
watch(
    () => props.selected.id,
    () => {
        nextTick(() => {
            if (scrollContainer.value) {
                scrollContainer.value.scrollTo({ top: 0, behavior: "smooth" })
            }
        })
    }
)

const hasNormalWears = computed(() => {
    // MP5-SD | Lab Rats is the only skin that has no normal wears only souvenir
    if (props.selected.id.startsWith("skin-e73d6e7e9004")) {
        return false
    }

    return true
})

function onNameVisibility(state: boolean) {
    showItemName.value = !state
}

// Use the inspect composable
const { inspectLink } = useInspect(
    computed(() => props.selected),
    computed(() => props.items[props.selected.id])
)

function getWearPrice(index: number, type: string = ""): string | null {
    const id = generateIdByWear(index, type)
    const item = props.items[id]
    return priceStore.getPrice(item?.market_hash_name)
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

function getItemDetails(id: string) {
    if (id.startsWith("skin-vanilla")) {
        emit("get-item-details", id)
        return
    }

    emit("get-item-details", id.includes("skin") ? `${id}_0` : id)
}
</script>
