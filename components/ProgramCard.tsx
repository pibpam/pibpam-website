import React from 'react';
import { FiCalendar, FiClock, FiExternalLink, FiUsers } from 'react-icons/fi';

import styles from '../styles/components/ProgramCard.module.scss'
import { IScheduleDate} from "../interfaces/Schedule";
import {DateUtils} from "../utils/Date";

interface IProgramCard {
    onClick: () => void
    schedule: IScheduleDate
}

const ProgramCard: React.FC<IProgramCard> = ({onClick, schedule}) => {
  return (
    <div onClick={onClick} className={styles.programCardContainer} >
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
    </div>
  );
}

export default ProgramCard;
