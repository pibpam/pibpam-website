import { cacheLife } from "next/cache";
import { getChurchInfo, getContents, getReadingPlanDay, getSchedules, getSeriesList } from "@/lib/api";
import { buildMetadata } from "@/lib/seo";
import { READING_PLAN, SITE_DESCRIPTION } from "@/lib/site";
import { htmlToParagraphs, truncate } from "@/lib/format";
import { Hero } from "@/sections/home/Hero";
import { LiveNow } from "@/sections/home/LiveNow";
import { LatestMessages } from "@/sections/home/LatestMessages";
import { SeriesRail } from "@/sections/home/SeriesRail";
import { ReadingPlan } from "@/sections/home/ReadingPlan";
import { AgendaPreview } from "@/sections/home/AgendaPreview";
import { AboutTeaser } from "@/sections/home/AboutTeaser";
import { VisitCTA } from "@/sections/home/VisitCTA";
import { Give } from "@/sections/home/Give";

export const metadata = buildMetadata({ description: SITE_DESCRIPTION, path: "/" });

export default async function HomePage() {
  "use cache";
  cacheLife("minutes");

  const [info, contents, series, agenda, reading] = await Promise.all([
    getChurchInfo(),
    getContents("transmission", 1, 3),
    getSeriesList(1, 8),
    getSchedules(6),
    getReadingPlanDay(READING_PLAN.slug),
  ]);

  const [firstParagraph] = htmlToParagraphs(info?.history);

  return (
    <>
      <Hero schedules={info?.church_schedules ?? []} />
      <LiveNow />
      <LatestMessages contents={contents.data} />
      <ReadingPlan reading={reading} />
      <SeriesRail series={series.data} />
      <AgendaPreview items={agenda} />
      <AboutTeaser excerpt={firstParagraph && truncate(firstParagraph, 320)} />
      <VisitCTA info={info} />
      <Give />
    </>
  );
}
