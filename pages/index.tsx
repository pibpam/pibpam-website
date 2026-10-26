import type { NextPage } from "next";
import Home, { IHomeProps } from "../container/Home";
import { Api } from "../services/api";
import { ReadingPlansApi } from "../services/readingPlans";
import { READING_PLAN_SLUG } from "../utils/ReadingPlan";

const HomePage: NextPage<IHomeProps> = (props) => {
  return <Home {...props} />;
};

// Props precisam ser serializáveis (sem undefined), por isso o fallback para null/[].
export async function getStaticProps() {
  const api = new Api();

  const [content, schedules, readingPlans, birthdays] =
    await Promise.allSettled([
      api.getContents(1, "transmission", 1),
      api.getSchedules(1),
      new ReadingPlansApi().getLatestDay(READING_PLAN_SLUG),
      api.getMonthBirthDateMembers(),
    ]);

  return {
    props: {
      lastService:
        content.status === "fulfilled" ? content.value.data[0] || null : null,
      nextEvent:
        schedules.status === "fulfilled" ? schedules.value[0] || null : null,
      readingPlan:
        readingPlans.status === "fulfilled" ? readingPlans.value : null,
      birthdaysMonth: birthdays.status === "fulfilled" ? birthdays.value : [],
    },
    // A leitura do dia, o último culto, a agenda e os aniversários mudam ao longo do dia.
    revalidate: 600,
  };
}

export default HomePage;
