import axios from "axios"

export default class StickersService {
    async query({ search }: { search: string }) {
        let items: { name: string /* more properties */ }[] = await axios
            .get("https://bymykel.github.io/CSGO-API/api/en/patches.json")
            .then((res) => res.data)

        if (search) {
            items = items.filter((item) =>
                item.name.toLowerCase().includes(search.toLowerCase())
            )
        }

        return {
            items
        }
    }
}
