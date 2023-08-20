import BaseService from "./BaseService"

export default class Cs2Service extends BaseService {
    constructor() {
        super("https://cs2-api.vercel.app/api")
    }
}
