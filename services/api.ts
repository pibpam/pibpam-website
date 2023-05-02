import axios from "axios";
import {IDevotinal} from "../interfaces/Devotinal";
import {IContent} from "../interfaces/Contens";
import {ITeam} from "../interfaces/Team";
import {IScheduleDate} from "../interfaces/Schedule";

export class Api {
    private client

    constructor() {
        this.client = axios.create({
            baseURL: "http://ec2-52-207-255-226.compute-1.amazonaws.com/"
        })
    }

    async getDevotionals() {
        const {data} = await this.client.get<IDevotinal[]>("v1/devotionals")
        return data
    }

    async getDevotional(uuid: string) {
        const {data} = await this.client.get<IDevotinal>("v1/devotionals/" + uuid)
        return data
    }

    async getContents() {
        const {data} = await this.client.get<IContent[]>("v1/contents")
        return data
    }

    async getLives() {
        const {data} = await this.client.get<IContent[]>("v1/contents/lives")
        return data
    }

    async getContent(uuid: string) {
        const {data} = await this.client.get<IContent>("v1/contents/" + uuid)
        return data
    }

    async getMinistries() {
        const {data} = await this.client.get<ITeam[]>("v1/teams")
        return data
    }

    async getMinistry(uuid: string) {
        const {data} = await this.client.get<ITeam>("v1/teams/" + uuid)
        return data
    }

    async getSchedule( scheduleUuid: string) {
        const {data} = await this.client.get<IScheduleDate>("v1/schedules/date/" + scheduleUuid)
        return data
    }

    async getSchedulesHighlighted() {
        const {data} = await this.client.get<IScheduleDate[]>("v1/schedules/highlighted")
        return data
    }

    async getSchedules(limit = undefined) {
        const params = {} as { limit?: number }
        if (limit) {
            params.limit = limit
        }

        const {data} = await this.client.get<IScheduleDate[]>("v1/schedules", {params})
        return data
    }

}
