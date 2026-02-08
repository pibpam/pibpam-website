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
    item.itemsQtd = item.readingPlanItems?.length || 0;
    return item;
  });

  return { props: { data } };
}

export default ReadingPlanPage;
