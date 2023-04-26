import axios from "axios";
import {IDevotinal} from "../interfaces/Devotinal";
import {IContent} from "../interfaces/Contens";

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

    async getContents() {
        const {data} = await this.client.get<IContent[]>("contents")
        return data
    }

    async getLives() {
        const {data} = await this.client.get<IContent[]>("contents/lives")
        return data
    }

    async getContent(uuid: string) {
        const {data} = await this.client.get<IContent>("contents/" + uuid)
        return data
    }

}
