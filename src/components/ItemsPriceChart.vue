<template>
    <div>
        <apexchart
            v-if="priceHistory.length > 0"
            type="line"
            height="256"
            :options="chartOptions"
            :series="series"
        />
        <div
            v-else
            class="flex items-center justify-center h-full text-white"
        >
            No history price data found
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { currencySigns } from "../constants"
import { getCurrentCurrency } from "../utils"

const props = defineProps({
    priceHistory: {
        type: Array,
        default: () => []
    }
})

const series = computed(() => [
    {
        type: "area",
        name: "Volume",
        data: props.priceHistory.map((item: any) => item.volume)
    },
    {
        type: "line",
        name: "Price",
        data: props.priceHistory.map((item: any) => item.value)
    }
])

const chartOptions = computed(() => ({
    chart: {
        type: "line",
        fontFamily: "inherit",
        sparkline: {
            enabled: true
        },
        animations: {
            enabled: false
        }
    },
    dataLabels: {
        enabled: false
    },
    fill: {
        opacity: [0.1, 1],
        type: ["solid", "solid"]
    },
    stroke: {
        show: true,
        curve: "smooth",
        lineCap: "round",
        width: 1
    },
    grid: {
        padding: {
            top: 10
        }
    },
    series: series,
    xaxis: {
        labels: {
            padding: 0
        },
        tooltip: {
            enabled: false
        },
        axisBorder: {
            show: false
        }
    },
    yaxis: [
        {
            title: {
                text: "Volume"
            },
            labels: {
                padding: 0,
                formatter: function (value: number) {
                    return value
                }
            }
        },
        {
            title: {
                text: "Price"
            },
            labels: {
                padding: 0,
                formatter: function (value: number) {
                    return value + ` ${currencySigns[getCurrentCurrency()]}`
                }
            }
        }
    ],
    colors: ["#fb7185", "#818cf8"],
    labels: props.priceHistory?.map((item: any) =>
        new Date(item.time).toDateString()
    ),
    legend: {
        show: false
    },
    point: {
        show: false
    }
}))
</script>
