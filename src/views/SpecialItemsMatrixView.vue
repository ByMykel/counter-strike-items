<template>
    <div class="flex flex-col flex-1 h-full min-w-0">
        <div class="flex-shrink-0">
            <MatrixHeader />
            <MatrixTabs
                v-if="!loading"
                :tabs="allTabsData"
                :selected-tab-id="selectedTab"
                @select-tab="selectedTab = $event"
            />
        </div>

        <div
            v-if="loading"
            class="flex-1 flex items-center justify-center"
        >
            <svg
                class="size-8 animate-spin text-white/10"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                />
                <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
            </svg>
        </div>

        <div
            v-else
            ref="containerRef"
            class="flex-1 overflow-y-scroll overflow-x-hidden relative min-w-0 max-w-full"
            style="height: 0"
            @wheel.shift="handleWheel"
            @mousedown="handleMouseDown"
            @scroll="handleScroll"
        >
            <div
                ref="matrixRef"
                class="select-none"
                :style="{
                    minWidth: 'max-content',
                    transform: `translateX(${translateX}px)`,
                    transition: isDragging ? 'none' : 'transform 0.1s ease-out',
                    cursor: isDragging ? 'grabbing' : 'grab'
                }"
            >
                <table class="border-collapse">
                    <MatrixTableHeader
                        :visible-columns="visibleColumns"
                        :visible-col-start="visibleColStart"
                        :visible-col-end="visibleColEnd"
                        :total-columns="columns.length"
                    />
                    <tbody>
                        <!-- Spacer row for rows above visible range -->
                        <tr
                            v-if="visibleRowStart > 0"
                            :style="{
                                height: `${visibleRowStart * ROW_HEIGHT}px`
                            }"
                        >
                            <td
                                :style="{ width: `${PATTERN_COLUMN_WIDTH}px` }"
                            />
                            <td
                                v-for="column in columns"
                                :key="`spacer-${column}`"
                                :style="{ width: `${COLUMN_WIDTH}px` }"
                            />
                        </tr>
                        <!-- Visible rows -->
                        <tr
                            v-for="row in visibleRows"
                            :key="row"
                            class="hover:bg-black-300/20 border-b border-black-300/30"
                        >
                            <td
                                class="bg-black-400 border-r-2 border-black-300 px-3 py-2 w-[250px] h-[120px] align-middle"
                            >
                                <span class="text-sm text-white break-words">{{
                                    getRowDisplayName(row)
                                }}</span>
                            </td>
                            <!-- Spacer cells for columns before visible range -->
                            <td
                                v-if="visibleColStart > 0"
                                :style="{
                                    width: `${visibleColStart * COLUMN_WIDTH}px`,
                                    height: `${ROW_HEIGHT}px`
                                }"
                            />
                            <!-- Visible columns -->
                            <td
                                v-for="column in visibleColumns"
                                :key="`${row}-${column}`"
                                class="border-r border-black-300/50 px-2 py-2 w-[180px] h-[120px] align-middle text-center"
                            >
                                <MatrixCell
                                    :cell-data="getCellData(row, column)"
                                    :row="row"
                                    :column="column"
                                    :show-only-first-item="
                                        currentTabData?.showOnlyFirstItem
                                    "
                                    :show-crates="currentTabData?.showCrates"
                                    @select-item="selectItem"
                                    @select-crate="selectCrate"
                                />
                            </td>
                            <!-- Spacer cells for columns after visible range -->
                            <td
                                v-if="visibleColEnd < columns.length - 1"
                                :style="{
                                    width: `${(columns.length - visibleColEnd - 1) * COLUMN_WIDTH}px`,
                                    height: `${ROW_HEIGHT}px`
                                }"
                            />
                        </tr>
                        <!-- Spacer row for rows below visible range -->
                        <tr
                            v-if="visibleRowEnd < rows.length - 1"
                            :style="{
                                height: `${(rows.length - visibleRowEnd - 1) * ROW_HEIGHT}px`
                            }"
                        >
                            <td
                                :style="{ width: `${PATTERN_COLUMN_WIDTH}px` }"
                            />
                            <td
                                v-for="column in columns"
                                :key="`spacer-bottom-${column}`"
                                :style="{ width: `${COLUMN_WIDTH}px` }"
                            />
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from "vue"
import { useRoute, useRouter } from "vue-router"
import SpecialItemsMatrixService, {
    type CellData,
    type TabData
} from "../services/SpecialItemsMatrixService"
import { useItemDetailStore } from "../stores/ItemDetail"
import { useTitle } from "../composable/useTitle"
import MatrixHeader from "../components/MatrixHeader.vue"
import MatrixTabs from "../components/MatrixTabs.vue"
import MatrixCell from "../components/MatrixCell.vue"
import MatrixTableHeader from "../components/MatrixTableHeader.vue"

// Types are imported from SpecialItemsMatrixService

const itemDetailStore = useItemDetailStore()
const route = useRoute()
const router = useRouter()
const containerRef = ref<HTMLElement>()
const matrixRef = ref<HTMLElement>()
const loading = ref(true)
const translateX = ref(0)
const isDragging = ref(false)
const dragStartX = ref(0)
const dragStartTranslateX = ref(0)

// All tabs data loaded from service
const allTabsData = ref<TabData[]>([])

// Get initial tab from query parameter or default to first tab
function getInitialTab(): string {
    const tab = route.query.tab as string
    // Check if the tab from query exists in loaded tabs
    if (tab && allTabsData.value.some((t) => t.id === tab)) {
        return tab
    }
    // Default to first tab
    return allTabsData.value[0]?.id || ""
}

const selectedTab = ref<string>("")

// Current tab data (computed from allTabsData)
const currentTabData = computed(() => {
    return allTabsData.value.find((tab) => tab.id === selectedTab.value)
})

const columns = computed(() => {
    return currentTabData.value?.columns || []
})

const rows = computed(() => {
    return currentTabData.value?.rows || []
})

const rowDisplayMap = computed(() => {
    return currentTabData.value?.rowDisplayMap || new Map()
})

const matrixMap = computed(() => {
    return currentTabData.value?.matrixMap || new Map()
})

const matrixService = new SpecialItemsMatrixService()

// Virtual scrolling constants
const ROW_HEIGHT = 120
const COLUMN_WIDTH = 180
const PATTERN_COLUMN_WIDTH = 250
const BUFFER_ROWS = 3 // Extra rows to render outside viewport
const BUFFER_COLUMNS = 2 // Extra columns to render outside viewport

// Virtual scrolling state
const scrollTop = ref(0)
const visibleRowStart = ref(0)
const visibleRowEnd = ref(0)
const visibleColStart = ref(0)
const visibleColEnd = ref(0)

// Computed visible ranges
const visibleRows = computed(() => {
    return rows.value.slice(visibleRowStart.value, visibleRowEnd.value + 1)
})

const visibleColumns = computed(() => {
    return columns.value.slice(visibleColStart.value, visibleColEnd.value + 1)
})

// Calculate visible ranges based on scroll position
function updateVisibleRanges() {
    if (
        !containerRef.value ||
        rows.value.length === 0 ||
        columns.value.length === 0
    ) {
        return
    }

    const container = containerRef.value
    const containerHeight = container.clientHeight
    const containerWidth = container.clientWidth

    // Calculate visible row range
    const scrollTopValue = container.scrollTop
    const startRow = Math.max(
        0,
        Math.floor(scrollTopValue / ROW_HEIGHT) - BUFFER_ROWS
    )
    const endRow = Math.min(
        rows.value.length - 1,
        Math.ceil((scrollTopValue + containerHeight) / ROW_HEIGHT) + BUFFER_ROWS
    )

    // Calculate visible column range based on translateX
    const visibleStartX = -translateX.value
    const visibleEndX = visibleStartX + containerWidth
    const startCol = Math.max(
        0,
        Math.floor((visibleStartX - PATTERN_COLUMN_WIDTH) / COLUMN_WIDTH) -
            BUFFER_COLUMNS
    )
    const endCol = Math.min(
        columns.value.length - 1,
        Math.ceil((visibleEndX - PATTERN_COLUMN_WIDTH) / COLUMN_WIDTH) +
            BUFFER_COLUMNS
    )

    visibleRowStart.value = startRow
    visibleRowEnd.value = endRow
    visibleColStart.value = startCol
    visibleColEnd.value = endCol
}

// Handle scroll events
function handleScroll() {
    if (containerRef.value) {
        scrollTop.value = containerRef.value.scrollTop
        updateVisibleRanges()
    }
}

async function loadData() {
    loading.value = true
    try {
        // Load all tabs data at once
        allTabsData.value = await matrixService.loadAllTabsData()

        // Set initial tab after data loads
        if (selectedTab.value === "") {
            selectedTab.value = getInitialTab()
        }

        // Update visible ranges after data loads
        nextTick(() => {
            updateVisibleRanges()
        })
    } catch (error) {
        console.error("Error loading special items:", error)
    } finally {
        loading.value = false
    }
}

function getCellData(row: string, column: string): CellData | null {
    const key = `${row}|${column}`
    return matrixMap.value.get(key) || null
}

function getRowDisplayName(rowKey: string): string {
    return rowDisplayMap.value.get(rowKey) || rowKey
}

function selectCrate(crateId: string) {
    itemDetailStore.getItemDetails(crateId)
}

function selectItem(itemId: string) {
    // Format the ID correctly for skins (same logic as ItemDetailPanel)
    if (itemId.startsWith("skin-vanilla")) {
        itemDetailStore.getItemDetails(itemId)
        return
    }

    // For skins, append _0 to get the first wear variant
    const formattedId = itemId.includes("skin") ? `${itemId}_0` : itemId
    itemDetailStore.getItemDetails(formattedId)
}

// Horizontal drag functionality
function handleMouseDown(e: MouseEvent) {
    if (e.button !== 0) return // Only left mouse button
    // Don't drag if clicking on interactive elements
    const target = e.target as HTMLElement
    if (
        target.tagName === "BUTTON" ||
        target.tagName === "IMG" ||
        target.closest("button")
    ) {
        return
    }
    isDragging.value = true
    dragStartX.value = e.clientX
    dragStartTranslateX.value = translateX.value
    e.preventDefault()

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
}

let rafId: number | null = null

function getMinTranslate(): number {
    if (!containerRef.value || columns.value.length === 0) return 0

    // Calculate the full content width based on all columns (not just visible ones)
    // Pattern column (250px) + all data columns (columns.length * 180px)
    const fullContentWidth =
        PATTERN_COLUMN_WIDTH + columns.value.length * COLUMN_WIDTH
    const containerWidth = containerRef.value.clientWidth

    // Only allow scrolling if content is wider than container
    if (fullContentWidth <= containerWidth) return 0

    // Calculate the exact amount we can scroll
    // We want to stop when the right edge of the content aligns with the right edge of the container
    const minTranslate = -(fullContentWidth - containerWidth)

    // Round to avoid sub-pixel issues
    return Math.round(minTranslate)
}

function handleMouseMove(e: MouseEvent) {
    if (!isDragging.value) return

    if (rafId !== null) {
        cancelAnimationFrame(rafId)
    }

    rafId = requestAnimationFrame(() => {
        const deltaX = e.clientX - dragStartX.value
        const maxTranslate = 0
        const minTranslate = getMinTranslate()
        // Clamp the value to ensure we don't drag beyond bounds
        const newTranslateX = Math.max(
            Math.min(dragStartTranslateX.value + deltaX, maxTranslate),
            minTranslate
        )
        // Round to avoid sub-pixel accumulation
        translateX.value = Math.round(newTranslateX)
        rafId = null
    })

    e.preventDefault()
}

function handleMouseUp() {
    isDragging.value = false
    document.removeEventListener("mousemove", handleMouseMove)
    document.removeEventListener("mouseup", handleMouseUp)
}

let wheelRafId: number | null = null

// Horizontal scroll with wheel (only called when shift is held due to @wheel.shift modifier)
const handleWheel = (e: WheelEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (wheelRafId !== null) {
        cancelAnimationFrame(wheelRafId)
    }

    wheelRafId = requestAnimationFrame(() => {
        const maxTranslate = 0
        const minTranslate = getMinTranslate()
        // Clamp the value to ensure we don't scroll beyond bounds
        const newTranslateX = Math.max(
            Math.min(translateX.value - e.deltaX, maxTranslate),
            minTranslate
        )
        // Round to avoid sub-pixel accumulation
        translateX.value = Math.round(newTranslateX)
        wheelRafId = null
    })
}

function clampTranslateX() {
    const maxTranslate = 0
    const minTranslate = getMinTranslate()
    const clamped = Math.max(
        Math.min(translateX.value, maxTranslate),
        minTranslate
    )
    translateX.value = Math.round(clamped)
}

onMounted(async () => {
    await loadData()
    // Recalculate scroll limits after data loads and DOM updates
    await nextTick()
    // Clamp translateX to ensure it's within bounds
    clampTranslateX()
    // Initialize visible ranges
    updateVisibleRanges()
})

// Watch for changes in columns/rows to recalculate scroll limits
watch([columns, rows], async () => {
    await nextTick()
    clampTranslateX()
    updateVisibleRanges()
})

// Watch translateX to update visible columns
watch(translateX, () => {
    updateVisibleRanges()
})

// Watch for tab changes
watch(selectedTab, (newTab) => {
    // Update query parameter
    router.replace({
        query: { ...route.query, tab: newTab }
    })

    // Reset scroll positions
    translateX.value = 0
    if (containerRef.value) {
        containerRef.value.scrollTop = 0
    }

    // Update visible ranges for new tab
    nextTick(() => {
        clampTranslateX()
        updateVisibleRanges()
    })
})

onUnmounted(() => {
    document.removeEventListener("mousemove", handleMouseMove)
    document.removeEventListener("mouseup", handleMouseUp)
    if (rafId !== null) {
        cancelAnimationFrame(rafId)
    }
    if (wheelRafId !== null) {
        cancelAnimationFrame(wheelRafId)
    }
})

useTitle("Matrix - Counter-Strike items")
</script>
