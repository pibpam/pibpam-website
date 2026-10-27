import type { NextPage } from "next";
import React from "react";

import { Api } from "../../services/api";
import { IScheduleDate } from "../../interfaces/Schedule";
import Website from "../../layout/container/Website";
import AppHeader from "../../components/AppHeader";
import DetailsSchedule from "../../container/Schedule/Details";

interface IParams {
  params: {
    id: string;
  };
}

interface ISchedulePage {
  data: IScheduleDate;
}

const SchedulePage: NextPage<ISchedulePage> = ({ data }) => {
  return (
    <Website title={data.schedule.title} img={data.schedule.image} hasTabNavigator={false}>
      <>
        <AppHeader title="Agenda" />
        <DetailsSchedule data={data} />
      </>
    </Website>
  );
};

export async function getServerSideProps({ params }: IParams) {
  const api = new Api();
  try {
    const data = await api.getSchedule(params.id);
    if (!data) {
      return { notFound: true };
    }
    return { props: { data } };
  } catch {
    return { notFound: true };
  }
}

export default SchedulePage;
