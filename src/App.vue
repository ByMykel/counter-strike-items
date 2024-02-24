<template>
    <div class="flex flex-row h-dvh">
        <div class="shadow-md w-14 shrink-0 bg-black-500 lg:w-64">
            <div class="flex flex-col h-full gap-10 px-1 py-4 lg:px-5">
                <nav class="flex-1">
                    <ul
                        role="list"
                        class="flex flex-col"
                    >
                        <li>
                            <ul
                                role="list"
                                class="flex flex-col gap-1"
                            >
                                <li
                                    v-for="routeItem of routes"
                                    :key="routeItem.name"
                                    class="group"
                                >
                                    <RouterLink
                                        :to="routeItem.path"
                                        class="flex gap-4 p-2 rounded-md text-black-100 hover:bg-black-400 hover:text-white"
                                        :class="{
                                            'bg-black-400 text-white':
                                                routeItem.path === route.path
                                        }"
                                    >
                                        <component
                                            :is="routeItem.icon"
                                            class="size-8 lg:size-6"
                                        />
                                        <span class="hidden lg:flex">
                                            {{ routeItem.name }}
                                        </span>
                                    </RouterLink>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
                <div class="mt-auto">
                    <button
                        type="button"
                        class="flex w-full gap-4 p-2 rounded-md hover:bg-black-400"
                    >
                        <Cog6ToothIcon class="text-white size-8 lg:size-6" />
                        <span class="hidden text-white lg:flex">
                            Settings
                        </span>
                    </button>
                </div>
            </div>
        </div>
        <div class="w-full grow">
            <div class="flex flex-row">
                <RouterView />
                <ItemDetailPanel />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { RouterView, useRoute } from "vue-router"
import { HomeIcon } from "@heroicons/vue/24/outline"
// import { ArchiveBoxIcon } from "@heroicons/vue/24/outline";
import { Cog6ToothIcon } from "@heroicons/vue/24/outline"
import ItemDetailPanel from "./components/ItemDetailPanel.vue"
// import { WrenchScrewdriverIcon } from "@heroicons/vue/24/outline";
import { HashtagIcon } from "@heroicons/vue/24/outline"
// import { MusicalNoteIcon } from "@heroicons/vue/24/outline"

const route = useRoute()

const routes = [
    { name: "All", path: "/", icon: HomeIcon },
    { name: "Skins", path: "/skins", icon: HashtagIcon }
    // { name: 'Stickers', path: '/stickers', icon: WrenchScrewdriverIcon },
    // { name: 'Collections', path: '/collections', icon: WrenchScrewdriverIcon },
    // { name: 'Crates', path: '/crates', icon: WrenchScrewdriverIcon },
    // { name: 'Collectibles', path: '/collectibles', icon: WrenchScrewdriverIcon },
    // { name: 'Keys', path: '/keys', icon: WrenchScrewdriverIcon },
    // { name: 'Agents', path: '/agents', icon: WrenchScrewdriverIcon },
    // { name: 'Patches', path: '/patches', icon: WrenchScrewdriverIcon },
    // { name: 'Graffiti', path: '/graffiti', icon: WrenchScrewdriverIcon },
    // { name: "Music kits", path: "/music-kits", icon: MusicalNoteIcon }

    // { name: 'Storage Units', path: '/storage-units', icon: ArchiveBoxIcon }, // WIP
]
</script>
