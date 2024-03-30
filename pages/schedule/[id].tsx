import type { NextPage } from 'next'
import React from "react";

import { Api } from "../../services/api";
import { IScheduleDate } from "../../interfaces/Schedule";
import ScheduleContainer from '../../container/Schedule';
import { IChurchSchedule } from '../../interfaces/Church';

interface IParams {
  params: {
    id: string
  }
}

export interface ISchedule {
  highlighted: IScheduleDate[]
  schedules: IScheduleDate[]
  churchSchedules?: IChurchSchedule[]
  uuid: string
}


const Schedule: NextPage<ISchedule> = (data) => {
  return (<ScheduleContainer {...data}  />)
}

export async function getServerSideProps({ params }: IParams) {
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
  return { props: { highlighted, schedules: schedules, churchSchedules, uuid: params.id } }
}


export default Schedule
