<template>
    <div class="w-full p-4 px-5 space-y-20 overflow-y-scroll h-screen">
        <div
            v-for="section in items"
            :key="section.title"
            class="flex flex-col gap-3"
        >
            <div
                class="flex items-start gap-3 sm:flex-row flex-col sm:items-center"
            >
                <p class="text-xl text-white">
                    {{ section.title }}
                </p>
                <span
                    class="text-xs text-white bg-black-200 p-0.5 px-1 rounded-md"
                >Added on {{ section.date }}</span>
            </div>

            <a
                :href="section.link"
                target="_blank"
                class="text-sm text-white hover:underline flex items-center gap-2"
            >
                <LinkIcon class="w-4 h-4" />Link to counter strike blog
            </a>

            <div
                class="grid w-full gap-3 mx-auto items-grid-small md:items-grid"
            >
                <template v-if="!loading">
                    <ItemCard
                        v-for="item in section.items"
                        :id="item.id"
                        :key="item.id"
                        :name="item.name"
                        :image="item.image"
                        :souvenir="item?.souvenir ?? false"
                        :stattrak="item?.stattrak ?? false"
                        :rare="item?.rare ?? false"
                        :genuine="item?.genuine ?? false"
                        :market-hash-name="item.market_hash_name"
                        @show="itemDetailStore.getItemDetails(item.id)"
                    />
                </template>
                <ItemsSkeleton
                    v-else
                    :number-items="section.items.length"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useItemDetailStore } from "../stores/ItemDetail"
import { useTitle } from "../composable/useTitle"
import ItemCard from "../components/ItemCard.vue"
import ItemsSkeleton from "../components/ItemsSkeleton.vue"
import { LinkIcon } from "@heroicons/vue/24/outline"

const itemDetailStore = useItemDetailStore()

const items = computed(() => {
    return [
        {
            title: "Community Maps, Charms, and More",
            link: "https://www.counter-strike.net/newsentry/498333631688738072",
            date: "October 2, 2025",
            items: [
                itemDetailStore.items["collection-set-kc-drboom"],
                itemDetailStore.items["collection-set-kc-ml-community-01"],
                itemDetailStore.items["collection-set-community-2025"],
                itemDetailStore.items["collection-set-sugarface2"]
            ]
        },
        {
            title: "Show Off",
            link: "https://www.counter-strike.net/newsentry/514095143786120351",
            date: "September 17, 2025",
            items: [
                itemDetailStore.items["collection-set-community-36"],
                itemDetailStore.items["crate-5176"]
            ]
        },
        {
            title: "Tonight's Forecast: Rain-cient",
            link: "https://www.counter-strike.net/newsentry/657081807721726187",
            date: "August 14, 2025",
            items: [
                itemDetailStore.items["skin-fc8f37597f72_0"],
                itemDetailStore.items["music_kit-87"],
                itemDetailStore.items["music_kit-88"],
                itemDetailStore.items["music_kit-89"],
                itemDetailStore.items["music_kit-90"],
                itemDetailStore.items["music_kit-91"],
                itemDetailStore.items["music_kit-92"],
                itemDetailStore.items["music_kit-93"],
                itemDetailStore.items["music_kit-94"],
                itemDetailStore.items["music_kit-95"]
            ]
        },
        {
            title: "Season Two: Episode One",
            link: "https://www.counter-strike.net/newsentry/529852487375519751",
            date: "July 16, 2025",
            items: [
                itemDetailStore.items["collectible-5145"],
                itemDetailStore.items["collectible-5150"],
                itemDetailStore.items["collectible-5155"],
                itemDetailStore.items["collectible-5160"],
                itemDetailStore.items["collectible-5165"],
                itemDetailStore.items["collectible-5170"],
                itemDetailStore.items["collectible-5175"]
            ]
        }
    ]
})

const loading = computed(() => {
    return Object.keys(itemDetailStore.items).length === 0
})

useTitle("Counter-Strike items")
</script>
