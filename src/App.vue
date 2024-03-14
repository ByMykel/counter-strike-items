<template>
    <div class="flex flex-row h-dvh">
        <div
            class="border-r-2 w-14 shrink-0 bg-black-400 lg:w-72 border-black-300"
        >
            <div class="flex flex-col h-full">
                <div
                    class="hidden lg:flex items-center w-full h-[69px] border-b-2 border-black-300 px-4 sticky top-0 text-black-100"
                >
                    <div class="flex items-center">
                        <img
                            src="https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/patches/case01/patch_howl_png.png"
                            alt="counter-strike-items logo"
                            class="mr-2 h-9"
                        >
                        <div>
                            <p
                                class="block text-base font-semibold leading-none tracking-wider text-[#ff5e65]"
                            >
                                counter-strike-items
                            </p>
                            <div
                                class="text-xs text-left text-black-100 leading-none tracking-wide mt-[0.2rem]"
                            >
                                by
                                <a
                                    href="https://github.com/ByMykel"
                                    target="_blank"
                                    class="transition hover:text-white"
                                >ByMykel</a>
                                on
                                <a
                                    href="https://github.com/ByMykel/counter-strike-items"
                                    target="_blank"
                                    class="transition hover:text-white"
                                >github</a>
                            </div>
                        </div>
                    </div>
                </div>
                <nav class="flex-1 px-1 py-5 lg:px-5">
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
                                        class="flex gap-4 p-2 rounded-md text-black-100 hover:bg-black-300 hover:text-white"
                                        active-class="text-white bg-black-300"
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
                <div class="px-1 py-5 mt-auto lg:px-5">
                    <button
                        type="button"
                        class="flex w-full gap-4 p-2 rounded-md hover:bg-black-300 hover:text-white"
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
import { RouterView } from "vue-router"
import {
    ArchiveBoxIcon,
    BanknotesIcon,
    BugAntIcon,
    Cog6ToothIcon,
    HomeIcon,
    KeyIcon,
    MusicalNoteIcon,
    PaintBrushIcon,
    RectangleStackIcon,
    StarIcon,
    TrophyIcon,
    UserGroupIcon
} from "@heroicons/vue/24/outline"
import { usePricesStore } from "./stores/prices"
import ItemDetailPanel from "./components/ItemDetailPanel.vue"

const { fetchPrices } = usePricesStore()

const routes = [
    { name: "All", path: "/", icon: HomeIcon },
    { name: "Skins", path: "/skins", icon: BanknotesIcon },
    { name: "Stickers", path: "/stickers", icon: StarIcon },
    { name: "Collections", path: "/collections", icon: RectangleStackIcon },
    { name: "Crates", path: "/crates", icon: ArchiveBoxIcon },
    { name: "Collectibles", path: "/collectibles", icon: TrophyIcon },
    { name: "Agents", path: "/agents", icon: UserGroupIcon },
    { name: "Keys", path: "/keys", icon: KeyIcon },
    { name: "Patches", path: "/patches", icon: BugAntIcon },
    { name: "Graffiti", path: "/graffiti", icon: PaintBrushIcon },
    { name: "Music kits", path: "/music-kits", icon: MusicalNoteIcon }
]

fetchPrices()
</script>
