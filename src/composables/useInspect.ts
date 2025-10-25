import { computed } from "vue"
import { generateLink } from "@csfloat/cs2-inspect-serializer"

// Item type definitions
interface InspectableItem {
    id: string
    wears?: Array<{ id: string; name: string }>
}

interface RawItemData {
    weapon?: { weapon_id: number }
    paint_index?: string
    wear?: { id: string }
    rarity?: { id: string }
}

// Inspect link generators for different item types
const inspectGenerators = {
    skin: (_item: InspectableItem, rawItem: RawItemData) => {
        if (
            !rawItem.weapon?.weapon_id ||
            !rawItem.paint_index ||
            !rawItem.wear?.id ||
            !rawItem.rarity?.id
        ) {
            return null
        }

        return {
            // TODO: some attributes are missing, for example quality
            defindex: rawItem.weapon.weapon_id,
            paintindex: parseInt(rawItem.paint_index),
            paintwear: getWearValue(rawItem.wear.id),
            rarity: getRarityValue(rawItem.rarity.id),
            stickers: [],
            keychains: []
        }
    }

    // Add more item types here as needed
    // sticker: (item, rawItem) => { ... },
    // agent: (item, rawItem) => { ... },
    // etc.
}

export function useInspect(item: any, rawItem: any) {
    const inspectLink = computed(() => {
        try {
            if (!item.value || !rawItem.value) return null

            const itemType = getItemType(item.value)
            const generator = inspectGenerators[itemType]

            if (!generator) {
                console.warn(`No inspect generator for item type: ${itemType}`)
                return null
            }

            const inspectData = generator(item.value, rawItem.value)

            if (!inspectData) {
                console.warn("Failed to generate inspect data")
                return null
            }

            return generateLink(inspectData)
        } catch (error) {
            console.error("Failed to generate inspect link:", error)
            return null
        }
    })

    return {
        inspectLink
    }
}

// Helper functions
function getItemType(item: InspectableItem): keyof typeof inspectGenerators {
    if (item.id.includes("skin")) return "skin"
    // Add more type detection logic here
    // if (item.id.includes('sticker')) return 'sticker'
    // if (item.id.includes('agent')) return 'agent'

    return "skin" // Default fallback
}

function getWearValue(wearId: string): number {
    const wearMap: Record<string, number> = {
        SFUI_InvTooltip_Wear_Amount_0: 0.0001, // Factory New
        SFUI_InvTooltip_Wear_Amount_1: 0.07, // Minimal Wear
        SFUI_InvTooltip_Wear_Amount_2: 0.15, // Field-Tested
        SFUI_InvTooltip_Wear_Amount_3: 0.38, // Well-Worn
        SFUI_InvTooltip_Wear_Amount_4: 0.45 // Battle-Scarred
    }
    return wearMap[wearId] || 0.15 // Default to Field-Tested
}

function getRarityValue(rarityId: string): number {
    switch (rarityId) {
        case "rarity_contraband_weapon":
            return 7
        case "rarity_ancient_weapon":
        case "rarity_ancient":
            return 6
        case "rarity_legendary_weapon":
            return 5
        case "rarity_mythical_weapon":
            return 4
        case "rarity_rare_weapon":
            return 3
        case "rarity_uncommon_weapon":
            return 2
        case "rarity_common_weapon":
            return 1
        default:
            console.warn(`Unknown rarity: ${rarityId}`)
            return 0
    }
}
