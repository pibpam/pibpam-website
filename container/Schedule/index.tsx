import React from "react";
import { Container } from "@/components/ui/Container";
import { ServiceTimes } from "@/components/agenda/ServiceTimes";
import { ISchedule } from "../../pages/schedule";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import Website from "../../layout/container/Website";
import AppHeader from "../../components/AppHeader";
import AppAgendaList from "../../components/AppAgendaList";
import AgendaHighlight from "../../components/AgendaHighlight";

const SectionTitle: React.FC<{ children: string }> = ({ children }) => (
  <h2 className="mb-4 text-xl font-extrabold tracking-tight">{children}</h2>
);

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
            <section aria-label="Destaques">
              <SectionTitle>Destaques</SectionTitle>
              <ul className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2">
                {highlighted.map((item) => (
                  <li key={item.uuid} className="flex w-[82%] shrink-0 snap-start sm:w-[45%]">
                    <AgendaHighlight
                      schedule={item}
                      onClick={() => goTo({ pathname: "/schedule/" + item.uuid, showLoading: true })}
                    />
                  </li>
                ))}
              </ul>
            </section>
          )}

          {!!schedules.length && (
            <section aria-label="Próximas agendas">
              <SectionTitle>Próximas agendas</SectionTitle>
              <AppAgendaList items={schedules} />
            </section>
          )}

          {!!churchSchedules?.length && (
            <section aria-label="Horários dos cultos">
              <SectionTitle>Horários dos cultos</SectionTitle>
              <ServiceTimes items={churchSchedules} tone="light" />
            </section>
          )}
        </Container>
      </>
    </Website>
  );
};

export default ScheduleContainer;
