import type { NextPage } from "next";
import React from "react";

import { Api } from "../../services/api";
import { IScheduleDate } from "../../interfaces/Schedule";
import ScheduleContainer from "../../container/Schedule";

interface IParams {
  params: {
    id: string;
  };
}

export interface ISchedule {
  highlighted: IScheduleDate[];
  schedules: IScheduleDate[];
  uuid: string;
}

const Schedule: NextPage<ISchedule> = (data) => {
  return <ScheduleContainer {...data} />;
};

export async function getServerSideProps({ params }: IParams) {
  const api = new Api();
  const highlighted = await api.getSchedulesHighlighted();
  const schedules = await api.getSchedules();

  const finalSchedules = [] as IScheduleDate[];
  schedules.forEach((item) => {
    const hasType = finalSchedules.find(
      (schedule) => schedule.schedule.uuid === item.schedule.uuid,
    );
    if (!hasType) {
      finalSchedules.push(item);
    }
  });

  return { props: { highlighted, schedules: schedules, uuid: params.id } };
}

export default Schedule;
