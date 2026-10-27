import React from "react";
import { Container } from "@/components/ui/Container";
import { ServiceTimes } from "@/components/agenda/ServiceTimes";
import { ISchedule } from "../../pages/schedule";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import Website from "../../layout/container/Website";
import Reveal from "../../components/Reveal";
import AppHeader from "../../components/AppHeader";
import AppAgendaList from "../../components/AppAgendaList";
import AgendaHighlight from "../../components/AgendaHighlight";
import SectionTitle from "../../components/SectionTitle";

const ScheduleContainer: React.FC<ISchedule> = ({
  highlighted,
  schedules,
  churchSchedules,
}) => {
  const { goTo } = useAppNavigation();

  return (
    <Website title={"Agenda"}>
      <>
        <AppHeader title="Agenda" />
        <Container className="flex flex-col gap-10 pt-6 pb-32">
          {!!highlighted.length && (
            <Reveal index={0}><section aria-label="Destaques">
              <SectionTitle>Destaques</SectionTitle>
              <ul className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2">
                {highlighted.map((item, i) => (
                  <Reveal as="li" index={i + 1} key={item.uuid} className="flex w-[82%] shrink-0 snap-start sm:w-[45%]">
                    <AgendaHighlight
                      schedule={item}
                      onClick={() => goTo({ pathname: "/schedule/" + item.uuid })}
                    />
                  </Reveal>
                ))}
              </ul>
            </section></Reveal>
          )}

          {!!schedules.length && (
            <Reveal index={1}><section aria-label="Próximas agendas">
              <SectionTitle>Próximas agendas</SectionTitle>
              <AppAgendaList items={schedules} />
            </section></Reveal>
          )}

          {!!churchSchedules?.length && (
            <Reveal index={2}><section aria-label="Horários dos cultos">
              <SectionTitle>Horários dos cultos</SectionTitle>
              <ServiceTimes items={churchSchedules} tone="light" />
            </section></Reveal>
          )}
        </Container>
      </>
    </Website>
  );
};

export default ScheduleContainer;
