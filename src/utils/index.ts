function hashString(str: string) {
    let hash = 0
    if (str.length === 0) {
        return hash
    }
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i)
        hash = (hash << 5) - hash + char
        hash &= hash // Convert to 32bit integer
    }
    return hash
}

export function shuffleArrayWithSeed(array: any[], str = "") {
    let seed = hashString(str)
    const seededRandom = (max: number) => {
        const x = Math.sin(seed++) * 10000
        return Math.floor((x - Math.floor(x)) * (max + 1))
    }

    for (let i = array.length - 1; i > 0; i--) {
        const j = seededRandom(i)
        ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
}
