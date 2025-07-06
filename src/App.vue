<template>
    <div class="flex flex-row h-dvh">
        <div
            class="border-r-2 w-14 shrink-0 bg-black-400 lg:w-72 border-black-300"
        >
            <div class="flex flex-col h-full">
                <div
                    class="hidden lg:flex items-center w-full h-[69px] border-b-2 border-black-300 px-4 sticky top-0 text-black-100 shrink-0"
                >
                    <div class="flex items-center">
                        <img
                            src="https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/tools/casket_png.png"
                            alt="counter-strike-items logo"
                            class="mr-2 h-7"
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
                <nav class="flex-1 px-1 py-5 lg:overflow-y-auto">
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
                                    class="relative group"
                                >
                                    <RouterLink
                                        :to="{
                                            path: routeItem.path,
                                            query: {}
                                        }"
                                        class="flex justify-center gap-4 p-2 rounded-md lg:justify-start text-black-100 hover:bg-black-300 hover:text-white"
                                        active-class="text-white bg-black-300"
                                    >
                                        <component
                                            :is="routeItem.icon"
                                            class="size-6"
                                        />
                                        <span class="hidden lg:flex">
                                            {{ routeItem.name }}
                                        </span>
                                    </RouterLink>

                                    <div
                                        class="absolute hidden px-2 py-0.5 text-nowrap z-[1] bg-black-500 rounded-md text-white left-[calc(100%+5px)] top-[50%] shadow transform -translate-y-1/2 group-focus:block group-hover:block lg:group-focus:hidden lg:group-hover:hidden"
                                    >
                                        {{ routeItem.name }}
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
        <div class="w-full grow">
            <div class="flex flex-row">
                <RouterView />
                <ItemDetailPanel
                    v-if="itemDetailStore.selected"
                    :selected="itemDetailStore.selected"
                    :items="itemDetailStore.items"
                    @get-item-details="itemDetailStore.getItemDetails($event)"
                    @delete-item="itemDetailStore.deleteItem()"
                />
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
    HomeIcon,
    KeyIcon,
    MusicalNoteIcon,
    PaintBrushIcon,
    RectangleStackIcon,
    StarIcon,
    TrophyIcon,
    UserGroupIcon,
    TagIcon,
    Square3Stack3DIcon,
    VideoCameraIcon
} from "@heroicons/vue/24/outline"
import { usePricesStore } from "./stores/prices"
import { useItemDetailStore } from "./stores/ItemDetail"
import ItemDetailPanel from "./components/ItemDetailPanel.vue"
import { useI18n } from "petite-vue-i18n"

const { fetchPrices } = usePricesStore()
const itemDetailStore = useItemDetailStore()
const { t } = useI18n()

const routes = [
    { name: t("links_all"), path: "/", icon: HomeIcon },
    { name: t("links_skins"), path: "/skins", icon: BanknotesIcon },
    { name: t("links_stickers"), path: "/stickers", icon: StarIcon },
    {
        name: t("links_collections"),
        path: "/collections",
        icon: RectangleStackIcon
    },
    { name: t("links_crates"), path: "/crates", icon: ArchiveBoxIcon },
    { name: t("links_collectibles"), path: "/collectibles", icon: TrophyIcon },
    { name: t("links_agents"), path: "/agents", icon: UserGroupIcon },
    { name: t("links_keys"), path: "/keys", icon: KeyIcon },
    { name: t("links_patches"), path: "/patches", icon: BugAntIcon },
    { name: t("links_graffiti"), path: "/graffiti", icon: PaintBrushIcon },
    { name: t("links_music_kits"), path: "/music-kits", icon: MusicalNoteIcon },
    { name: t("links_keychains"), path: "/keychains", icon: TagIcon },
    {
        name: t("links_base_weapons"),
        path: "/base-weapons",
        icon: Square3Stack3DIcon
    },
    { name: t("links_highlights"), path: "/highlights", icon: VideoCameraIcon }
]

fetchPrices()
</script>
