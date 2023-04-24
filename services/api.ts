import axios from "axios";
import {IDevotinal} from "../interfaces/Devotinal";

export class Api {
    private client

    constructor() {
        this.client = axios.create({
            baseURL: "http://ec2-52-207-255-226.compute-1.amazonaws.com/"
        })
    }

    async getDevotionals() {
        const {data} = await this.client.get<IDevotinal[]>("devotionals")
        return data
    }

    async getDevotional(uuid: string) {
        const {data} = await this.client.get<IDevotinal>("devotionals/" + uuid)
        return data
    }

}
