<template>
    <div class="flex flex-row h-dvh">
        <!-- Desktop Sidebar -->
        <div
            v-if="showSidebar"
            class="hidden lg:block border-r-2 w-72 shrink-0 bg-black-400 border-black-300"
        >
            <div class="flex flex-col h-full">
                <div
                    class="flex items-center w-full h-[69px] border-b-2 border-black-300 px-4 sticky top-0 text-black-100 shrink-0"
                >
                    <AppBranding />
                </div>
                <nav class="flex-1 px-1 py-5 overflow-y-auto">
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
                                >
                                    <RouterLink
                                        :to="{
                                            path: routeItem.path,
                                            query: route.query.itemId
                                                ? { itemId: route.query.itemId }
                                                : {}
                                        }"
                                        class="flex gap-4 p-2 rounded-md justify-start text-black-100 hover:bg-black-300 hover:text-white"
                                        active-class="text-white bg-black-300"
                                    >
                                        <component
                                            :is="routeItem.icon"
                                            class="size-6"
                                        />
                                        <span>
                                            {{ routeItem.name }}
                                        </span>
                                    </RouterLink>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>

        <!-- Main Content -->
        <div class="w-full grow min-w-0 flex-1 min-h-0 pb-16 lg:pb-0">
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

        <!-- Mobile Bottom Navigation -->
        <nav
            v-if="showSidebar"
            class="fixed bottom-0 left-0 right-0 bg-black-400 border-t-2 border-black-300 lg:hidden z-40"
        >
            <div class="flex items-center justify-around h-16">
                <RouterLink
                    v-for="routeItem of mobileRoutes"
                    :key="routeItem.name"
                    :to="{
                        path: routeItem.path,
                        query: route.query.itemId
                            ? { itemId: route.query.itemId }
                            : {}
                    }"
                    class="flex flex-col items-center justify-center flex-1 h-full py-2 text-black-100 hover:text-white transition-colors"
                    active-class="text-white"
                >
                    <component
                        :is="routeItem.icon"
                        class="size-5"
                    />
                    <span class="text-[10px] mt-1 text-center leading-tight">
                        {{ routeItem.shortName || routeItem.name }}
                    </span>
                </RouterLink>
                <button
                    class="flex flex-col items-center justify-center flex-1 h-full py-2 text-black-100 hover:text-white transition-colors"
                    :class="{ 'text-white': mobileMenuOpen }"
                    @click="mobileMenuOpen = !mobileMenuOpen"
                >
                    <Bars3Icon class="size-5" />
                    <span class="text-[10px] mt-1">More</span>
                </button>
            </div>
        </nav>

        <!-- Mobile Menu Overlay -->
        <Transition
            enter-active-class="transition-opacity duration-200"
            leave-active-class="transition-opacity duration-200"
            enter-from-class="opacity-0"
            leave-to-class="opacity-0"
        >
            <div
                v-if="mobileMenuOpen"
                class="fixed inset-0 bg-black/50 z-30 lg:hidden"
                @click="mobileMenuOpen = false"
            />
        </Transition>

        <!-- Mobile Menu Panel -->
        <Transition
            enter-active-class="transition-transform duration-200 ease-out"
            leave-active-class="transition-transform duration-200 ease-in"
            enter-from-class="translate-y-full"
            leave-to-class="translate-y-full"
        >
            <div
                v-if="mobileMenuOpen"
                class="fixed bottom-16 left-0 right-0 bg-black-400 border-t-2 border-black-300 z-30 lg:hidden max-h-[60vh] overflow-y-auto rounded-t-xl"
            >
                <div class="p-2">
                    <div
                        class="flex items-center justify-center px-3 py-2 mb-2"
                    >
                        <AppBranding />
                    </div>
                    <ul class="grid grid-cols-3 gap-1">
                        <li
                            v-for="routeItem of routes"
                            :key="routeItem.name"
                        >
                            <RouterLink
                                :to="{
                                    path: routeItem.path,
                                    query: route.query.itemId
                                        ? { itemId: route.query.itemId }
                                        : {}
                                }"
                                class="flex flex-col items-center gap-1 p-3 rounded-lg text-black-100 hover:bg-black-300 hover:text-white"
                                active-class="text-white bg-black-300"
                                @click="mobileMenuOpen = false"
                            >
                                <component
                                    :is="routeItem.icon"
                                    class="size-6"
                                />
                                <span class="text-xs text-center leading-tight">
                                    {{ routeItem.shortName || routeItem.name }}
                                </span>
                            </RouterLink>
                        </li>
                    </ul>
                </div>
            </div>
        </Transition>
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
import { computed, ref } from "vue"
import { RouterView, RouterLink, useRoute } from "vue-router"
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
    TableCellsIcon,
    Bars3Icon
} from "@heroicons/vue/24/outline"
import { useItemDetailStore } from "./stores/ItemDetail"
import ItemDetailPanel from "./components/ItemDetailPanel.vue"
import AppBranding from "./components/AppBranding.vue"
import { useDebug } from "./composables/useDebug"

const itemDetailStore = useItemDetailStore()
const route = useRoute()

// Initialize debug mode globally
const { isDebugMode } = useDebug()

// Mobile menu state
const mobileMenuOpen = ref(false)

// Hide sidebar on special items matrix page
const showSidebar = computed(() => route.path !== "/matrix")

const routes = [
    { name: "Latest items", shortName: "Latest", path: "/", icon: FaceSmileIcon },
    { name: "Matrix", shortName: "Matrix", path: "/matrix", icon: TableCellsIcon },
    { name: "All", shortName: "All", path: "/home", icon: HomeIcon },
    { name: "Skins", shortName: "Skins", path: "/skins", icon: BanknotesIcon },
    { name: "Stickers", shortName: "Stickers", path: "/stickers", icon: StarIcon },
    { name: "Sticker Slabs", shortName: "Slabs", path: "/sticker-slabs", icon: StarIcon },
    { name: "Collections", shortName: "Collections", path: "/collections", icon: RectangleStackIcon },
    { name: "Crates", shortName: "Crates", path: "/crates", icon: ArchiveBoxIcon },
    { name: "Collectibles", shortName: "Collectibles", path: "/collectibles", icon: TrophyIcon },
    { name: "Agents", shortName: "Agents", path: "/agents", icon: UserGroupIcon },
    { name: "Keys", shortName: "Keys", path: "/keys", icon: KeyIcon },
    { name: "Patches", shortName: "Patches", path: "/patches", icon: BugAntIcon },
    { name: "Graffiti", shortName: "Graffiti", path: "/graffiti", icon: PaintBrushIcon },
    { name: "Music kits", shortName: "Music", path: "/music-kits", icon: MusicalNoteIcon },
    { name: "Keychains", shortName: "Keychains", path: "/keychains", icon: TagIcon },
    { name: "Base weapons", shortName: "Weapons", path: "/base-weapons", icon: Square3Stack3DIcon },
    { name: "Highlights", shortName: "Highlights", path: "/highlights", icon: VideoCameraIcon }
]

// Quick access routes for mobile bottom bar (most used categories)
const mobileRoutes = [
    { name: "Latest", shortName: "Latest", path: "/", icon: FaceSmileIcon },
    { name: "Skins", shortName: "Skins", path: "/skins", icon: BanknotesIcon },
    { name: "Stickers", shortName: "Stickers", path: "/stickers", icon: StarIcon },
    { name: "Crates", shortName: "Crates", path: "/crates", icon: ArchiveBoxIcon }
]
</script>
