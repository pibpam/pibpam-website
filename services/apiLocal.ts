import axios from "axios";
import {IGetAllContentsResponse} from "../interfaces/Contens";

export class ApiLocal {
    private client

    constructor() {
        this.client = axios.create({baseURL: "api/"})
    }

    async getContents(page: number, limit: number) {
        const {data} = await this.client.get<IGetAllContentsResponse>("/contents", {
            params: {
                page, limit
            }
        })
        return data
    }

}
