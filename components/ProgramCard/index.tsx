import React from 'react';
import { FiCalendar, FiClock, FiExternalLink, FiUsers } from 'react-icons/fi';

import { IScheduleDate} from "../../interfaces/Schedule";
import {DateUtils} from "../../utils/Date";
import { Container } from './styles';

interface IProgramCard {
    onClick: () => void
    schedule: IScheduleDate
}

const ProgramCard: React.FC<IProgramCard> = ({onClick, schedule}) => {
  return (
    <Container onClick={onClick} >
      <div>
        <div>{schedule.schedule.title}</div>
        <div><FiUsers /></div>
      </div>
      <div>
        <div>
          <div><FiCalendar />{DateUtils.formatDateDayAndMonth(schedule.scheduleDate)}</div>
          <div><FiClock />{DateUtils.formatTime(schedule.scheduleDate)}</div>
        </div>
        <FiExternalLink />
      </div>
    </Container>
  );
}

export default ProgramCard;
