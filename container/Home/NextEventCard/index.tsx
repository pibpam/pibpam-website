import React, { useEffect, useState } from "react";
import { PiCalendarBlank } from "react-icons/pi";
import { IScheduleDate } from "../../../interfaces/Schedule";
import { DateUtils } from "../../../utils/Date";
import { Calendar, Container, DateRow, Label, Title, When } from "./styles";

interface INextEventCardProps {
  schedule?: IScheduleDate;
  goTo: (pathname: string) => void;
}

const capitalize = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);

const NextEventCard: React.FC<INextEventCardProps> = ({ schedule, goTo }) => {
  // Evento de hoje ganha destaque. A página é gerada estaticamente, então só o cliente
  // sabe se a data ainda é "hoje".
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(!!schedule && DateUtils.isToday(schedule.scheduleDate));
  }, [schedule]);

  return (
    <Container
      type="button"
      $active={active}
      onClick={() => goTo(schedule ? "/schedule/" + schedule.uuid : "/schedule")}
    >
      <Label $active={active}>
        <PiCalendarBlank />
        {active ? "Evento de hoje" : "Próximo evento"}
      </Label>

      {schedule ? (
        <>
          <DateRow>
            <Calendar $active={active}>
              <small>{DateUtils.formatMonthShort(schedule.scheduleDate)}</small>
              <strong>{DateUtils.formatDay(schedule.scheduleDate)}</strong>
            </Calendar>
            <When $active={active}>
              <strong>{capitalize(DateUtils.getWeekdayStr(schedule.scheduleDate))}</strong>
              <span>{DateUtils.formatTime(schedule.scheduleDate)}</span>
            </When>
          </DateRow>
          <Title $active={active}>{schedule.schedule.title}</Title>
        </>
      ) : (
        <Title $active={false}>Nenhum evento programado no momento.</Title>
      )}
    </Container>
  );
};

export default NextEventCard;
