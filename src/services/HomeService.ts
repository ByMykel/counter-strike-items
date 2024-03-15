import axios from "axios"
import { shuffleArrayWithSeed } from "../utils/index"

export default class HomeService {
    async query({ search }: { search: string }) {
        let items: { name: string /* more properties */ }[] = await axios
            .get("https://bymykel.github.io/CSGO-API/api/en/all.json")
            .then((res) => Object.values(res.data))

        if (search) {
            items = items.filter((item) =>
                item.name.toLowerCase().includes(search.toLowerCase())
            )

            return {
                items
            }
        }

        return {
            // Return home items randomizated based on date.
            items: shuffleArrayWithSeed(
                items,
                new Date().toISOString().slice(0, 10)
            )
        }
    }

    async getAllItems() {
        return axios
            .get("https://bymykel.github.io/CSGO-API/api/en/all.json")
            .then((res) => res.data)
    }
}
