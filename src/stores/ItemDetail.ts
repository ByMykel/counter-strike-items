import { ref } from "vue"
import { defineStore } from "pinia"

import { ItemDetail } from "../types/index"
import Cs2Service from "../services/Cs2Service"

export const useItemDetailStore = defineStore("item-detail", () => {
    const ItemsService = new Cs2Service()

    const previous = ref<ItemDetail[]>([])
    const selected = ref<ItemDetail>()
    const loading = ref(false)
    const history = ref<{ [key: string]: ItemDetail }>({})

    async function getItemDetails(id: string, savePrevious = false) {
        if (loading.value) {
            return
        }

        if (!savePrevious) {
            previous.value = []
        }

        if (id in history.value) {
            if (savePrevious && selected.value) {
                previous.value.push(selected.value)
            }

            selected.value = history.value[id]
            return
        }

        try {
            loading.value = true
            const data = await ItemsService.getById(id)
            const skin =
                data.skin_id && (await ItemsService.getById(data.skin_id))

            if (savePrevious && selected.value) {
                previous.value.push(selected.value)
            }

            if (data.skin_id) {
                selected.value = {
                    id: skin.id,
                    name: skin.name,
                    description: skin.description,
                    crates: skin.crates,
                    collections: skin.collections,
                    contains: [],
                    containsRare: [],
                    specialNotes: skin?.special_notes ?? [],
                    image: skin.image
                }
            } else {
                selected.value = {
                    id: id,
                    name: data.name,
                    description: data.description,
                    crates: data?.crates ?? [],
                    collections: data?.collections ?? [],
                    contains: data?.contains ?? [],
                    containsRare: data?.contains_rare ?? [],
                    specialNotes: data?.special_notes ?? [],
                    image: data.image
                }
            }
            history.value[id] = selected.value
        } catch (error) {
            console.error(error)
        } finally {
            loading.value = false
        }
    }

    async function getPrevious() {
        selected.value = previous.value.pop()
    }

    function deleteItem() {
        if (previous.value.length) {
            getPrevious()
            return
        }

        selected.value = undefined
    }

    return {
        selected,
        loading,
        previous,

        getItemDetails,
        getPrevious,
        deleteItem
    }
})
