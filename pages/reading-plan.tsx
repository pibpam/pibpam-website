import type { NextPage } from "next";
import React from "react";
import { Api } from "../services/api";
import { IGetAllReadingPlan } from "../interfaces/ReadingPlan";
import ReadingPlan from "../container/ReadingPlan";

interface IReadingPlanProps {
  data: IGetAllReadingPlan;
}

const ReadingPlanPage: NextPage<IReadingPlanProps> = ({ data }) => {
  return <ReadingPlan readingPlans={data} />;
};

export async function getStaticProps() {
  const api = new Api();
  const data = await api.getReadingPlans();

  data.data = data.data.map((item) => {
    let total = 0;
    item.readingPlanItems?.forEach((read) => {
      total = total + (read.dailyReading?.audio ? 1 : 0);
      total = total + read.dailyReading?.reference ? read.dailyReading?.reference?.split(";").length : 1;
    });
    item.itemsQtd = total;
    return item;
  });

  return { props: { data } };
}

export default ReadingPlanPage;
