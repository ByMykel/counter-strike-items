<template>
  <div class="flex flex-row">
    <div class="relative flex-1 w-full">
      <SearchBar :query="query" :scrolled-down="y > 40" :total="items?.total" @input="inputChanged" />
      <div ref="el"
        class="grid w-full h-screen gap-3 p-4 px-5 pb-32 mx-auto overflow-y-scroll items-grid-small md:items-grid">
        <ItemCard v-for="item in items?.data" :key="item.id" :item="item" :selected-item-id="selectedItemId"
          @selected="selectItem" />
        <ItemsSkeleton v-if="loading" />
        <div v-if="!loading" v-element-visibility="onElementVisibility" class="py-10" />
      </div>
    </div>
    <div v-if="selectedItemId"
      class="h-screen border-l-2 border-black-300 w-80 xl:w-[30rem] hidden md:flex flex-col relative">

      <div
        class="flex items-center w-full h-[69px] border-b-2 border-black-300 px-4 sticky top-0 bg-black-400 text-black-100">
        <button @click="deleteItem()">
          <XMarkIcon class="w-6 h-6 text-white" />
        </button>
        <p v-show="showItemName" class="ml-4 truncate text-black-100">{{ selectedItem?.name }}</p>
      </div>

      <div v-if="selectedItem" class="h-[calc(100vh-69px)] px-4 py-4 overflow-x-hidden">

        <div class="mb-4 space-y-3">
          <a v-for="(note, index) of selectedItem.special_notes" :key="`special-note-${index}`" :href="note.source" target="_blank">
            <div class="p-3 text-sm text-yellow-800 bg-yellow-300 rounded-md">
              {{ note.text }}

            </div>
          </a>
        </div>

        <div>
          <img
            class="object-contain w-full h-[16rem] px-12 py-6 rounded-md bg-black-300/80 bg-[url('/img/graph-paper.svg')]"
            :src="selectedItem.image" :alt="selectedItem.name" />
        </div>

        <div class="py-3">
          <p v-element-visibility="onNameVisibility" class="col-span-8 text-white">{{ selectedItem.name }}</p>
          <p class="py-2 text-sm text-black-100">{{ selectedItem.description }}</p>
        </div>

        <div v-if="selectedItem.id.includes('crate-')" class="overflow-hidden divide-y rounded-md divide-black-200">
          <div class="p-3 bg-black-300 ">
            <p v-for="item of selectedItem.contains" :key="item" class="text-sm text-black-100">{{ item.name }}</p>
          </div>
          <div v-if="selectedItem.contains_rare.length" class="p-3 bg-black-300 ">
            <div v-if="!showRareItems" class="text-center cursor-pointer text-black-100" @click="showRareItems = true">
              Show {{ selectedItem.contains_rare.length }} Rare Special Items
            </div>
            <div v-else>
              <p v-for="item of selectedItem.contains_rare" :key="item" class="text-sm text-yellow-400">{{ item.name }}
              </p>
              <div class="mt-3 text-center cursor-pointer text-black-100" @click="showRareItems = false">
                Hide Rare Special Items
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="!selectedItem" class="flex items-center justify-center h-[70vh]">
        <div role="status">
          <svg aria-hidden="true" class="w-8 h-8 mr-2 text-black-300 animate-spin fill-blue-500" viewBox="0 0 100 101"
            fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor" />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill" />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useDebounceFn } from "@vueuse/core";
import { vElementVisibility } from "@vueuse/components";

import { XMarkIcon } from "@heroicons/vue/24/outline";

import { useScroll } from '@vueuse/core'
import ItemsSkeleton from "./components/ItemsSkeleton.vue"
import SearchBar from "./components/SearchBar.vue"
import ItemCard from "./components/ItemCard.vue"

import Cs2Service from "./services/Cs2Service"

import { usePricesStore } from "./stores/prices"

const ItemsService = new Cs2Service();

const el = ref<HTMLElement | null>(null)
const { y } = useScroll(el)

type Item = {
  id: string;
  image: string;
  name: string;
  // phase?: string;
  // wear?: string;
  [key: string]: any;
};

const query = ref(getQueryParam('q'));
const items = ref<{
  data: Item[];
  page: {
    prev: string | null;
    next: string | null;
  };
  total: number;
} | null>(null);
const loading = ref(true);
const showItemName = ref(false);
const showRareItems = ref(false);
const selectedItemId = ref("")
const selectedItem = ref<Item | null>(null)

const isVisible = ref(false);

const { fetchPrices } = usePricesStore();

fetchPrices();

const debouncedFn = useDebounceFn(() => {
  fetchItems();
}, 200);

onMounted(() => {
  // Listen for changes in the browser's history
  window.addEventListener('popstate', () => {
    const newQuery = getQueryParam('q');

    if (newQuery !== query.value) {
      query.value = newQuery;
      fetchItems()
    }

  });
});

fetchItems();

function inputChanged(value: string) {
  query.value = value
  debouncedFn()
}

function getQueryParam(param: string) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param) || '';
}

function updateQueryParam() {
  const currentURL = new URL(window.location.href);

  if (query.value) {
    currentURL.searchParams.set('q', query.value);
  } else {
    currentURL.searchParams.delete('q');
  }

  // Update the URL without refreshing the page
  history.pushState({}, '', currentURL.toString());
}


function onElementVisibility(state: boolean) {
  isVisible.value = state;

  if (state === true && !loading.value && items.value?.page?.next) {
    loading.value = true;
    loadMore();
  }
}


function onNameVisibility(state: boolean) {
  showItemName.value = !state;
}

async function fetchItems() {
  loading.value = true

  try {
    const data = await ItemsService.getItems(query.value)
    items.value = data;

  } catch (error) {
    // TODO: handle error
    items.value = null;
    console.error(error)
  } finally {
    loading.value = false;
    updateQueryParam()
  };
}

async function loadMore() {
  if (items.value?.page?.next == null) return;

  try {
    const data = await ItemsService.getNext(items.value.page.next)

    items.value = {
      ...data,
      data: [...(items.value?.data ?? []), ...data.data],
    };
    loading.value = false;
  } catch (error) {
    // TODO: handle error
    console.error(error)
  }
}

async function selectItem(id: string) {
  deleteItem()
  selectedItemId.value = id

  try {
    const data = await ItemsService.getById(id)

    if (data.skin_id) {
      const skin = await ItemsService.getById(data.skin_id)
      selectedItem.value = {
        ...data,
        ...skin
      }
      return
    }

    selectedItem.value = data
  } catch (error) {
    // TODO: handle error
    console.error(error)
  }
}

async function deleteItem() {
  selectedItemId.value = "";
  selectedItem.value = null
}
</script>