import type { NextPage } from "next";
import { Api } from "../../services/api";
import { IReadingPlan, IReference } from "../../interfaces/ReadingPlan";
import Details from "../../container/ReadingPlan/Details";
import {
  EBible,
  getBookByAbbreviation,
  getVerses,
  IBook,
} from "../../data/bibles";

interface IReadingPlanProps {
  data: IReadingPlan;
}

const ReadingPlanPage: NextPage<IReadingPlanProps> = ({ data }) => {
  return <Details readingPlan={data} />;
};

export async function getStaticPaths() {
  const api = new Api();
  const data = await api.getReadingPlans();

  const paths = data.data.map((item) => ({
    params: { uuid: item.uuid },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({
  params,
}: {
  params: { uuid: string };
}) {
  const api = new Api();
  const data = await api.getReadingPlan(params.uuid);

  data.readingPlanItems = data.readingPlanItems?.map((item) => {
    const readings = item.dailyReading?.reference?.split(";") || [];

    console.log("readings", readings);

    const readingObj: IReference[] = [];

    readings.forEach((item) => {
      if (!item) {
        return;
      }
      //GN-1-1:32
      const [book, chapter] = item.split("-");

      const booksSelected = getBookByAbbreviation(EBible.NVI, book);
      const verses = getVerses(
        EBible.NVI,
        booksSelected?.id as number,
        Number(chapter),
      );

      readingObj.push({
        chapter: chapter,
        book: booksSelected as IBook,
        verses,
      });
    });

    return {
      ...item,
      dailyReading: {
        ...item.dailyReading,
        references: readingObj,
      },
    };
  });

  return { props: { data } };
}

export default ReadingPlanPage;
