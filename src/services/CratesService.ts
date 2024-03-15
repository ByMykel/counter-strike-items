import axios from "axios"

export default class CratesService {
    async query({ search }: { search: string }) {
        let items: { name: string /* more properties */ }[] = await axios
            .get("https://bymykel.github.io/CSGO-API/api/en/crates.json")
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
