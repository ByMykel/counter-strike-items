<template>
    <div class="flex flex-row h-dvh">
        <div
            v-if="showSidebar"
            class="border-r-2 w-14 shrink-0 bg-black-400 lg:w-72 border-black-300"
        >
            <div class="flex flex-col h-full">
                <div
                    class="hidden lg:flex items-center w-full h-[69px] border-b-2 border-black-300 px-4 sticky top-0 text-black-100 shrink-0"
                >
                    <AppBranding />
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
                                            query: route.query.itemId
                                                ? { itemId: route.query.itemId }
                                                : {}
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
        <div class="w-full grow min-w-0 flex-1 min-h-0">
            <div class="flex flex-row min-w-0 h-full">
                <RouterView class="min-w-0 flex-1 h-full" />
                <ItemDetailPanel
                    v-if="itemDetailStore.selected"
                    :selected="itemDetailStore.selected"
                    :items="itemDetailStore.items"
                    @get-item-details="itemDetailStore.getItemDetails($event)"
                    @delete-item="itemDetailStore.deleteItem()"
                    @go-back="itemDetailStore.goBack()"
                />
            </div>
        </div>
    </div>

    <!-- Debug Mode Label -->
    <Transition
        name="debug-slide"
        enter-active-class="transition-transform duration-300 ease-out"
        leave-active-class="transition-transform duration-300 ease-in"
        enter-from-class="transform translate-y-full"
        enter-to-class="transform translate-y-0"
        leave-from-class="transform translate-y-0"
        leave-to-class="transform translate-y-full"
    >
        <div
            v-if="isDebugMode"
            class="fixed bottom-4 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-yellow-500 text-white text-sm font-semibold rounded-md shadow-md z-50 flex items-center gap-2"
        >
            <span>DEBUG MODE ENABLED</span>
            <button
                class="px-2 py-0.5 bg-yellow-600 hover:bg-yellow-700 text-white text-xs rounded transition-colors"
                @click="isDebugMode = false"
            >
                Disable
            </button>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { RouterView, useRoute } from "vue-router"
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
    VideoCameraIcon,
    FaceSmileIcon,
    TableCellsIcon
} from "@heroicons/vue/24/outline"
import { useItemDetailStore } from "./stores/ItemDetail"
import ItemDetailPanel from "./components/ItemDetailPanel.vue"
import AppBranding from "./components/AppBranding.vue"
import { useDebug } from "./composables/useDebug"

const itemDetailStore = useItemDetailStore()
const route = useRoute()

// Initialize debug mode globally
const { isDebugMode } = useDebug()

// Hide sidebar on special items matrix page
const showSidebar = computed(() => route.path !== "/matrix")

const routes = [
    { name: "Latest items", path: "/", icon: FaceSmileIcon },
    {
        name: "Matrix",
        path: "/matrix",
        icon: TableCellsIcon
    },
    { name: "All", path: "/home", icon: HomeIcon },
    { name: "Skins", path: "/skins", icon: BanknotesIcon },
    { name: "Stickers", path: "/stickers", icon: StarIcon },
    { name: "Sticker Slabs", path: "/sticker-slabs", icon: StarIcon },
    {
        name: "Collections",
        path: "/collections",
        icon: RectangleStackIcon
    },
    { name: "Crates", path: "/crates", icon: ArchiveBoxIcon },
    { name: "Collectibles", path: "/collectibles", icon: TrophyIcon },
    { name: "Agents", path: "/agents", icon: UserGroupIcon },
    { name: "Keys", path: "/keys", icon: KeyIcon },
    { name: "Patches", path: "/patches", icon: BugAntIcon },
    { name: "Graffiti", path: "/graffiti", icon: PaintBrushIcon },
    { name: "Music kits", path: "/music-kits", icon: MusicalNoteIcon },
    { name: "Keychains", path: "/keychains", icon: TagIcon },
    {
        name: "Base weapons",
        path: "/base-weapons",
        icon: Square3Stack3DIcon
    },
    { name: "Highlights", path: "/highlights", icon: VideoCameraIcon }
]
</script>
