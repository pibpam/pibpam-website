import React from "react";
import styles from "../../styles/components/ScheduleEvent.module.scss"
import {FiCalendar, FiClock, FiExternalLink} from "react-icons/fi";
import {IScheduleDate} from "../../interfaces/Schedule";
import {DateUtils} from "../../utils/Date";

interface IScheduleEvent {
    onClick: () => void
    schedule: IScheduleDate
}

const ScheduleEvent: React.FC<IScheduleEvent> = ({onClick, schedule}) => {
    return (
        <div onClick={onClick} className={styles.container}>
            <div className={styles.external_link}><FiExternalLink/></div>
            <div className={styles.thumb}>
                <div className={styles.content}>
                    <h4>{schedule.schedule.title}</h4>
                    <p>{schedule.schedule.shortDescription}</p>
                    <div>
                        <div>Público: {schedule.schedule.publicSchedule}</div>
                        <div>
                            <span><FiCalendar/> {DateUtils.formatDateDayAndMonth(schedule.scheduleDate)}</span>
                            <span><FiClock/> {DateUtils.formatTime(schedule.scheduleDate)}</span>
                        </div>
                    </div>
                </div>
                <div className={styles.backdrop}
                     style={{background: "url('" + schedule.schedule.image + "') center/cover"}}/>
            </div>
        </div>
    )
}

export default ScheduleEvent
