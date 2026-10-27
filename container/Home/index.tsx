import React, { FC, useContext, useEffect, useState } from "react";
import {
  PiBookOpenText,
  PiCake,
  PiCalendarBlank,
  PiChurch,
  PiFilmSlate,
  PiMusicNotes,
  PiPlayCircle,
} from "react-icons/pi";
import Website from "../../layout/container/Website";
import AppHeader from "../../components/AppHeader";
import ShortcutCard from "../../components/ShortcutCard";
import usePostMessage from "../../hooks/usePostMessage";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import { LivesContext } from "../../contexts/lives";
import { IContent } from "../../interfaces/Contens";
import { IMemberBasic } from "../../interfaces/Member";
import { IPlanLatestDay } from "../../interfaces/ReadingPlan";
import { IScheduleDate } from "../../interfaces/Schedule";
import { DateUtils } from "../../utils/Date";
import { readingPlanDayUrl } from "../../utils/ReadingPlan";
import MediaCard from "./MediaCard";
import ReadingCard from "./ReadingCard";
import NextEventCard from "./NextEventCard";
import BirthdayCard from "./BirthdayCard";
import * as S from "./styles";

const CHURCH_ABOUT_URL = "https://pibpam.org/sobre";
// Atraso entre a entrada de uma célula e a seguinte.
const STAGGER_MS = 70;

export interface IHomeProps {
  lastService?: IContent | null;
  readingPlan?: IPlanLatestDay | null;
  nextEvent?: IScheduleDate | null;
  // Aniversariantes do mês; o filtro do dia é feito no cliente.
  birthdaysMonth: IMemberBasic[];
}

const Home: FC<IHomeProps> = ({
  lastService,
  readingPlan,
  nextEvent,
  birthdaysMonth,
}) => {
  const { goTo: goToHook } = useAppNavigation();
  const { openLink } = usePostMessage();
  const { lives } = useContext(LivesContext);

  // A página é gerada estaticamente: só o cliente sabe qual é o dia de hoje.
  const [today, setToday] = useState<number | null>(null);
  useEffect(() => {
    setToday(new Date().getDate());
  }, []);

  const birthdaysToday = birthdaysMonth.filter(
    (member) => today !== null && member.birthday === today,
  );

  const live = lives?.[0];

  const goTo = (pathname: string) =>
    goToHook({ pathname });

  // Cada célula entra com um pequeno atraso em relação à anterior.
  let order = 1;
  const delay = () => order++ * STAGGER_MS;

  return (
    <Website>
      <>
        <AppHeader tone="glass" />
        <S.Container>
          <S.Welcome>
            <h1>Bem-vindo!</h1>
            <p>Primeira Igreja Batista em Pará de Minas</p>
          </S.Welcome>

          <S.Grid>
            {live && (
              <S.Cell $cols={4} $rows={2} $delay={delay()}>
                <MediaCard
                  live
                  badge="Ao vivo agora"
                  title={live.title}
                  subtitle="Toque para assistir"
                  image={live.image}
                  onClick={() => goTo("/broadcast/" + live.uuid)}
                />
              </S.Cell>
            )}

            {lastService && (
              <S.Cell $cols={4} $rows={2} $delay={delay()}>
                <MediaCard
                  badge="Último culto"
                  title={lastService.name}
                  subtitle={[
                    lastService.author?.name,
                    DateUtils.formatDateDefault(lastService.contentDate),
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                  image={lastService.image}
                  onClick={() => goTo("/event/" + lastService.uuid)}
                />
              </S.Cell>
            )}

            {readingPlan && (
              <S.Cell $cols={2} $rows={2} $delay={delay()}>
                <ReadingCard
                  readingPlan={readingPlan}
                  onClick={() => openLink(readingPlanDayUrl(readingPlan.day.id))}
                />
              </S.Cell>
            )}

            <S.Cell $cols={2} $rows={2} $delay={delay()}>
              <NextEventCard schedule={nextEvent || undefined} goTo={goTo} />
            </S.Cell>

            <S.Cell $cols={2} $delay={delay()}>
              <ShortcutCard
                tone="lime"
                icon={<PiBookOpenText />}
                title="Bíblia"
                onClick={() => goTo("/bible")}
              />
            </S.Cell>
            <S.Cell $cols={2} $delay={delay()}>
              <ShortcutCard
                external
                icon={<PiChurch />}
                title="Sobre a igreja"
                onClick={() => openLink(CHURCH_ABOUT_URL)}
              />
            </S.Cell>

            <S.Cell $cols={1} $delay={delay()}>
              <ShortcutCard
                size="compact"
                icon={<PiPlayCircle />}
                title="Cultos"
                onClick={() => goTo("/events")}
              />
            </S.Cell>
            <S.Cell $cols={1} $delay={delay()}>
              <ShortcutCard
                size="compact"
                icon={<PiFilmSlate />}
                title="Séries"
                onClick={() => goTo("/series")}
              />
            </S.Cell>
            <S.Cell $cols={1} $delay={delay()}>
              <ShortcutCard
                size="compact"
                icon={<PiCalendarBlank />}
                title="Agenda"
                onClick={() => goTo("/schedule")}
              />
            </S.Cell>
            <S.Cell $cols={1} $delay={delay()}>
              <ShortcutCard
                size="compact"
                icon={<PiMusicNotes />}
                title="Hinários"
                onClick={() => goTo("/lyrics")}
              />
            </S.Cell>

            <S.Cell $cols={4} $delay={delay()}>
              {birthdaysToday.length ? (
                <BirthdayCard
                  birthdays={birthdaysToday}
                  onClick={() => goTo("/birthdays")}
                />
              ) : (
                <ShortcutCard
                  size="wide"
                  tone="tint"
                  icon={<PiCake />}
                  title="Aniversariantes"
                  description="Quem faz aniversário no mês"
                  onClick={() => goTo("/birthdays")}
                />
              )}
            </S.Cell>
          </S.Grid>
        </S.Container>
      </>
    </Website>
  );
};

export default Home;
