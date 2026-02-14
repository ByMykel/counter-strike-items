<template>
    <div class="flex flex-col gap-4">
        <!-- Range slider -->
        <div class="px-1 pt-2 pb-4">
            <div class="relative h-1.5">
                <div class="absolute w-full h-full rounded-full bg-black-300" />
                <div
                    class="absolute h-full rounded-full bg-[#ff5e65]"
                    :style="rangeStyle"
                />
                <input
                    type="range"
                    :min="0"
                    :max="SLIDER_MAX"
                    :step="SLIDER_STEP"
                    :value="sliderMinVal"
                    aria-label="Minimum price"
                    class="slider-thumb"
                    :class="{ 'z-[5]': sliderMinVal > SLIDER_MAX - SLIDER_STEP }"
                    @input="onMinSlider"
                >
                <input
                    type="range"
                    :min="0"
                    :max="SLIDER_MAX"
                    :step="SLIDER_STEP"
                    :value="sliderMaxVal"
                    aria-label="Maximum price"
                    class="slider-thumb"
                    @input="onMaxSlider"
                >
            </div>
        </div>

        <!-- Dollar inputs -->
        <div class="flex items-center gap-3">
            <div class="relative flex-1">
                <span class="absolute text-sm text-black-100 left-3 top-1/2 -translate-y-1/2 pointer-events-none select-none">$</span>
                <input
                    v-model="minDollars"
                    class="w-full py-2 pl-7 pr-3 text-white text-sm rounded-md bg-black-300 border-2 border-black-300 outline-none focus:ring-2 focus:ring-[#ff5e65] focus:border-transparent placeholder:text-black-200 no-spinner"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Min"
                    @input="onInput"
                >
            </div>
            <span class="text-xs text-black-200 select-none">to</span>
            <div class="relative flex-1">
                <span class="absolute text-sm text-black-100 left-3 top-1/2 -translate-y-1/2 pointer-events-none select-none">$</span>
                <input
                    v-model="maxDollars"
                    class="w-full py-2 pl-7 pr-3 text-white text-sm rounded-md bg-black-300 border-2 border-black-300 outline-none focus:ring-2 focus:ring-[#ff5e65] focus:border-transparent placeholder:text-black-200 no-spinner"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Max"
                    @input="onInput"
                >
            </div>
        </div>

        <button
            v-if="minDollars || maxDollars"
            class="self-end text-xs text-black-100 hover:text-white transition-colors cursor-pointer"
            @click="clear"
        >
            Clear
        </button>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue"

const SLIDER_MAX = 300000 // $3,000 in cents
const SLIDER_STEP = 100   // $1 increments

const props = defineProps<{
    values: string[]
}>()

const emit = defineEmits(["update:values"])

const minDollars = ref("")
const maxDollars = ref("")

const minCents = computed(() => {
    const v = parseFloat(minDollars.value)
    return v ? Math.round(v * 100) : 0
})

const maxCents = computed(() => {
    const v = parseFloat(maxDollars.value)
    return v ? Math.round(v * 100) : 0
})

const sliderMinVal = computed(() => Math.min(minCents.value, SLIDER_MAX))
const sliderMaxVal = computed(() =>
    maxCents.value ? Math.min(maxCents.value, SLIDER_MAX) : SLIDER_MAX
)

const rangeStyle = computed(() => {
    const left = (sliderMinVal.value / SLIDER_MAX) * 100
    const right = 100 - (sliderMaxVal.value / SLIDER_MAX) * 100
    return { left: `${left}%`, right: `${right}%` }
})

onMounted(() => {
    if (props.values.length === 2) {
        const min = Number(props.values[0])
        const max = Number(props.values[1])
        if (min) minDollars.value = (min / 100).toFixed(2)
        if (max) maxDollars.value = (max / 100).toFixed(2)
    }
})

function onMinSlider(e: Event) {
    const val = parseInt((e.target as HTMLInputElement).value)
    const clamped = Math.min(val, sliderMaxVal.value - SLIDER_STEP)
    minDollars.value = clamped <= 0 ? "" : (clamped / 100).toFixed(2)
    emitValues()
}

function onMaxSlider(e: Event) {
    const val = parseInt((e.target as HTMLInputElement).value)
    const clamped = Math.max(val, sliderMinVal.value + SLIDER_STEP)
    maxDollars.value = clamped >= SLIDER_MAX ? "" : (clamped / 100).toFixed(2)
    emitValues()
}

function onInput() {
    emitValues()
}

function clear() {
    minDollars.value = ""
    maxDollars.value = ""
    emitValues()
}

function emitValues() {
    if (!minCents.value && !maxCents.value) {
        emit("update:values", [])
        return
    }
    emit("update:values", [String(minCents.value), String(maxCents.value)])
}
</script>

<style scoped>
.slider-thumb {
    position: absolute;
    width: 100%;
    top: -5px;
    height: 16px;
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    pointer-events: none;
    outline: none;
    z-index: 3;
}

.slider-thumb::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #ff5e65;
    border: 2px solid #fff;
    cursor: pointer;
    pointer-events: all;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
    transition: transform 0.15s, box-shadow 0.15s;
}

.slider-thumb::-webkit-slider-thumb:hover {
    transform: scale(1.2);
    box-shadow: 0 0 0 4px rgba(255, 94, 101, 0.2);
}

.slider-thumb::-webkit-slider-thumb:active {
    transform: scale(1.3);
}

.slider-thumb::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #ff5e65;
    border: 2px solid #fff;
    cursor: pointer;
    pointer-events: all;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
    transition: transform 0.15s, box-shadow 0.15s;
}

.slider-thumb::-moz-range-thumb:hover {
    transform: scale(1.2);
    box-shadow: 0 0 0 4px rgba(255, 94, 101, 0.2);
}

.slider-thumb::-moz-range-thumb:active {
    transform: scale(1.3);
}

.no-spinner::-webkit-outer-spin-button,
.no-spinner::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.no-spinner {
    -moz-appearance: textfield;
}
</style>
