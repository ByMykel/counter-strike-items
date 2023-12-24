<template>
  <div class="flex flex-row h-screen">
    <div class="flex-shrink-0 border-r-2 w-14 lg:w-64 bg-black-400 border-black-300">
      <div class="flex flex-col h-full gap-10 px-1 py-4 lg:px-5">
        <h1 class="justify-center hidden my-2 text-lg italic text-white lg:flex">
          counter-strike-items
        </h1>
        <nav class="flex-1">
          <ul role="list" class="flex flex-col">
            <li>
              <ul role="list" class="flex flex-col gap-1">
                <li v-for="routeItem of routes" :key="routeItem.name">
                  <RouterLink :to="routeItem.path"
                    class="flex gap-4 p-2 rounded-md text-black-100 hover:bg-black-500 hover:text-white"
                    :class="{ 'bg-black-500 text-white': routeItem.path === route.path }">
                    <component :is="routeItem.icon" class="w-8 h-8 lg:w-6 lg:h-6" />
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
          <button type="button" class="flex w-full gap-4 p-2 rounded-md hover:bg-black-500">
            <Cog6ToothIcon class="w-8 h-8 text-white lg:w-6 lg:h-6" />
            <span class="hidden text-white lg:flex">
              Settings
            </span>
          </button>
        </div>
      </div>
    </div>
    <div class="flex-grow w-full">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { HomeIcon } from "@heroicons/vue/24/outline";
import { ArchiveBoxIcon } from "@heroicons/vue/24/outline";
import { Cog6ToothIcon } from "@heroicons/vue/24/outline";

const route = useRoute()

const routes = [
  { name: 'Home', path: '/', icon: HomeIcon },
  { name: 'Storage Units', path: '/storage-units', icon: ArchiveBoxIcon },
]
</script>
