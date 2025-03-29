<template>
    <div
        class="sticky top-0 left-0 right-0 px-5 pt-3 pb-2 duration-300 z-10 gap-2 flex flex-col"
        :class="[scrolledDown ? 'bg-black-300 shadow-lg' : 'bg-transparent']"
    >
        <div class="relative">
            <div class="absolute left-0 flex items-center h-full px-2">
                <MagnifyingGlassIcon class="w-6 h-6 text-black-200" />
            </div>
            <div class="absolute right-0 flex items-center h-full gap-2 px-3">
                <p
                    v-if="!loading"
                    class="px-2 text-sm text-white rounded-md bg-black-200 hidden sm:block"
                >
                    {{ $t("common_total") }}
                    <span class="font-semibold">{{ total }}</span>
                </p>
                <div
                    v-else
                    class="w-20 h-6 px-2 rounded-md bg-black-200 animate-pulse"
                />
                <div
                    class="w-0.5 h-[calc(100%-20px)] rounded-full bg-black-200/20"
                />
                <button
                    v-if="hasFilters"
                    type="button"
                    class="p-1 rounded-md hover:bg-black-200 relative"
                    @click="$emit('open-filters')"
                >
                    <FunnelIcon class="w-6 h-6 text-black-100" />
                    <div
                        v-if="hasSelectedFilters"
                        class="absolute top-1 right-1 bg-[#ff5e65] size-2 rounded-full"
                    />
                </button>
                <Listbox
                    :model-value="selectedLanguage"
                    @update:model-value="changeLocale($event.id)"
                >
                    <div class="mt-1">
                        <ListboxButton
                            class="p-1 rounded-md hover:bg-black-200"
                        >
                            <LanguageIcon class="w-6 h-6 text-black-100" />
                        </ListboxButton>

                        <ListboxOptions
                            class="absolute mt-1 right-0 max-h-60 !w-[250px] overflow-auto rounded-md bg-black-400 py-1 text-base shadow-lg ring-1 ring-white/5 focus:outline-none sm:text-sm"
                        >
                            <ListboxOption
                                v-for="language in languages"
                                v-slot="{ active, selected }"
                                :key="language.name"
                                :value="language"
                                as="template"
                            >
                                <li
                                    :class="[
                                        active
                                            ? 'bg-[#ff5e65]/10 text-[#ff5e65]'
                                            : 'text-white',
                                        selected
                                            ? 'bg-[#ff5e65]/10 !text-[#ff5e65]'
                                            : '',
                                        'relative cursor-default select-none py-2 px-4 flex items-center gap-2'
                                    ]"
                                >
                                    <img
                                        class="size-5 mr-3"
                                        :src="language.flag"
                                        :alt="`Flag of ${language.name}`"
                                    >
                                    <span
                                        :class="[
                                            selected
                                                ? 'font-medium'
                                                : 'font-normal',
                                            'block truncate'
                                        ]"
                                    >{{ language.name }}</span>
                                </li>
                            </ListboxOption>
                        </ListboxOptions>
                    </div>
                </Listbox>

                <Listbox
                    :model-value="selectedCurrency"
                    @update:model-value="changeCurrency($event.id)"
                >
                    <div class="mt-1">
                        <ListboxButton
                            class="p-1 rounded-md hover:bg-black-200"
                        >
                            <CurrencyDollarIcon
                                class="w-6 h-6 text-black-100"
                            />
                        </ListboxButton>

                        <ListboxOptions
                            class="absolute mt-1 right-0 max-h-60 !w-[250px] overflow-auto rounded-md bg-black-400 py-1 text-base shadow-lg ring-1 ring-white/5 focus:outline-none sm:text-sm"
                        >
                            <ListboxOption
                                v-for="currency in currencies"
                                v-slot="{ active, selected }"
                                :key="currency.name"
                                :value="currency"
                                as="template"
                            >
                                <li
                                    :class="[
                                        active
                                            ? 'bg-[#ff5e65]/10 text-[#ff5e65]'
                                            : 'text-white',
                                        selected
                                            ? 'bg-[#ff5e65]/10 !text-[#ff5e65]'
                                            : '',
                                        'relative cursor-default select-none py-2 px-4 flex items-center gap-2'
                                    ]"
                                >
                                    <span
                                        :class="[
                                            selected
                                                ? 'font-medium'
                                                : 'font-normal',
                                            'block truncate mr-3'
                                        ]"
                                    >
                                        {{ currency.symbol }}
                                    </span>
                                    <span
                                        :class="[
                                            selected
                                                ? 'font-medium'
                                                : 'font-normal',
                                            'block truncate'
                                        ]"
                                    >{{ currency.name }}</span>
                                </li>
                            </ListboxOption>
                        </ListboxOptions>
                    </div>
                </Listbox>
            </div>
            <input
                v-model="query"
                class="w-full h-full py-4 pl-12 pr-36 sm:pr-60 text-white border-0 rounded-md outline-none bg-black-300 focus:outline-none sm:text-sm focus:ring-2 focus:ring-[#ff5e65] focus:border-transparent"
                type="text"
                :placeholder="$t('common_search')"
                @keyup.enter="$emit('input', query)"
            >
        </div>
        <div
            v-if="hasSelectedFilters"
            class="flex gap-2 overflow-x-auto pb-0.5"
        >
            <div
                v-for="(values, prop) in filtersValues"
                :key="prop"
                class="flex items-center gap-1 text-sm p-1 flex-shrink-0 text-white rounded-md bg-black-300"
            >
                <div class="">
                    {{ filters.find((f) => f.prop === prop)?.name || prop }}
                </div>
                <div class="flex items-center gap-1 flex-wrap">
                    <button
                        v-for="value in values"
                        :key="value"
                        type="button"
                        class="text-white bg-black-200 px-1 rounded-md flex items-center gap-1"
                        @click="$emit('remove-filter', { prop, value })"
                    >
                        <XMarkIcon class="size-4 text-white" />
                        {{
                            filters
                                .find((f) => f.prop === prop)
                                ?.options.find((o) => o.id === value)?.name ||
                                value
                        }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue"
import {
    MagnifyingGlassIcon,
    FunnelIcon,
    LanguageIcon,
    CurrencyDollarIcon,
    XMarkIcon
} from "@heroicons/vue/24/outline"
import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption
} from "@headlessui/vue"
import {
    changeCurrency,
    changeLocale,
    getCurrentCurrency,
    getCurrentLocale
} from "../utils"
import { currencies } from "../constants/currency"
import { languages } from "../types/locale"
import { Filter } from "../types"

const props = defineProps<{
    query: string
    total: number
    scrolledDown: boolean
    hasFilters: boolean
    hasSelectedFilters: boolean
    loading: boolean
    filters: Filter[]
    filtersValues: { [prop: string]: string[] }
}>()

defineEmits(["input", "open-filters", "remove-filter"])

const query = ref(props.query || "")

watch(
    () => props.query,
    (newValue) => {
        query.value = newValue
    }
)

const selectedLanguage = ref(
    languages.find(({ id }) => id === getCurrentLocale())
)

const selectedCurrency = ref(
    currencies.find(({ id }) => id === getCurrentCurrency())
)
</script>
