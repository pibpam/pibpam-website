import type { NextPage } from 'next'
import React from "react";
import { Api } from "../services/api";
import { IScheduleDate } from "../interfaces/Schedule";
import { IChurchSchedule } from "../interfaces/Church";
import ScheduleContainer from '../container/Schedule';

export interface ISchedule {
  highlighted: IScheduleDate[]
  schedules: IScheduleDate[]
  churchSchedules?: IChurchSchedule[]
  uuid?: string
}

const Schedule: NextPage<ISchedule> = ({ highlighted, schedules, churchSchedules }) => {
  return <ScheduleContainer {...{highlighted, schedules, churchSchedules}} />
}

export async function getStaticProps() {
  const api = new Api()
  const highlighted = await api.getSchedulesHighlighted()
  const schedules = await api.getSchedules()

  const finalSchedules = [] as IScheduleDate[]
  schedules.forEach(item => {
    const hasType = finalSchedules.find(schedule => schedule.schedule.uuid === item.schedule.uuid)
    if (!hasType) {
      finalSchedules.push(item)
    }
  })

  const churchSchedules = await api.getChurchSchedule()
  return { props: { highlighted, schedules: schedules, churchSchedules } }
}

export default Schedule
