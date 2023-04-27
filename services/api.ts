import axios from "axios";
import {IDevotinal} from "../interfaces/Devotinal";
import {IContent} from "../interfaces/Contens";
import {ITeam} from "../interfaces/Team";

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

    async getMinistries() {
        const {data} = await this.client.get<ITeam[]>("teams")
        return data
    }

    async getMinistry(uuid: string) {
        const {data} = await this.client.get<ITeam>("teams/" + uuid)
        return data
    }

}
