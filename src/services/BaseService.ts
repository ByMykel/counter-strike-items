import axios from "axios";

export default class BaseService {
    protected baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async getById(id: string) {
        const url = `${this.baseUrl}/items?id=${id}`;

        const response = await axios.get(url);

        return response.data;
    }

    async search(query: string) {
        const url = `${this.baseUrl}/search?q=${encodeURIComponent(query)}`;

        const response = await axios.get(url);

        return response.data;
    }

    async getNext(next: string) {
        const response = await axios.get(next);

        return response.data;
    }
}
