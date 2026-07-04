<template>
    <!-- URL: short truncated link -->
    <a
        v-if="isUrl"
        :href="stringVal"
        target="_blank"
        rel="noopener"
        :title="stringVal"
        class="inline-block max-w-[200px] truncate align-bottom text-[#ff5e65] underline"
    >
        {{ shortUrl }}
    </a>

    <!-- Primitive: single line -->
    <span
        v-else-if="!isObject && !isArray"
        class="whitespace-nowrap"
        :class="valueClass"
    >{{ display }}</span>

    <!-- Array of objects: columnar table (one row per element) -->
    <div
        v-else-if="isArray && isTableArray"
        class="overflow-x-auto"
    >
        <table class="text-left border-collapse">
            <thead>
                <tr>
                    <th
                        v-for="col in columns"
                        :key="col"
                        class="border border-black-200 px-2 py-1 font-semibold text-white bg-black-200/40 whitespace-nowrap"
                    >
                        {{ col }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(row, index) in value"
                    :key="index"
                >
                    <td
                        v-for="col in columns"
                        :key="col"
                        class="border border-black-200 px-2 py-1 align-top"
                    >
                        <RawDataTable :value="row[col]" />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- Array of primitives / mixed: one row per entry -->
    <div
        v-else-if="isArray"
        class="overflow-x-auto"
    >
        <table class="text-left border-collapse">
            <tbody>
                <tr
                    v-for="(entry, index) in value"
                    :key="index"
                >
                    <td
                        class="border border-black-200 px-2 py-1 font-mono text-white/60 w-8 align-top"
                    >
                        {{ index }}
                    </td>
                    <td class="border border-black-200 px-2 py-1 align-top">
                        <RawDataTable :value="entry" />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- Object: key / value table -->
    <div
        v-else
        class="overflow-x-auto"
    >
        <table class="text-left border-collapse">
            <tbody>
                <tr
                    v-for="(val, key) in value"
                    :key="key"
                >
                    <td
                        class="border border-black-200 px-2 py-1 font-semibold text-white align-top whitespace-nowrap"
                    >
                        {{ key }}
                    </td>
                    <td class="border border-black-200 px-2 py-1 align-top">
                        <RawDataTable :value="val" />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue"

const props = defineProps<{
    value: unknown
}>()

const isArray = computed(() => Array.isArray(props.value))
const isObject = computed(
    () =>
        props.value !== null &&
        typeof props.value === "object" &&
        !Array.isArray(props.value)
)

const stringVal = computed(() =>
    typeof props.value === "string" ? props.value : ""
)
const isUrl = computed(() => /^https?:\/\//i.test(stringVal.value))
// Compact label for links: host + last path segment.
const shortUrl = computed(() => {
    try {
        const u = new URL(stringVal.value)
        const last = u.pathname.split("/").filter(Boolean).pop() ?? ""
        return last ? `${u.hostname}/…/${last}` : u.hostname
    } catch {
        return stringVal.value
    }
})

// An array is "table-shaped" when every element is a plain object.
const isTableArray = computed(() => {
    if (!isArray.value) return false
    const arr = props.value as unknown[]
    return (
        arr.length > 0 &&
        arr.every(
            (el) => el !== null && typeof el === "object" && !Array.isArray(el)
        )
    )
})

// Union of keys across all row objects, preserving first-seen order.
const columns = computed(() => {
    const seen: string[] = []
    for (const row of props.value as Record<string, unknown>[]) {
        for (const key of Object.keys(row)) {
            if (!seen.includes(key)) seen.push(key)
        }
    }
    return seen
})

const display = computed(() => {
    if (props.value === null) return "null"
    if (props.value === undefined) return "undefined"
    return String(props.value)
})

const valueClass = computed(() => {
    if (props.value === null || props.value === undefined)
        return "text-white/30 italic"
    if (typeof props.value === "boolean") return "text-purple-300"
    if (typeof props.value === "number") return "text-amber-300"
    return "text-black-100"
})
</script>
