import React from "react";
import {FiCalendar, FiClock, FiUsers} from "react-icons/fi";
import styles from "../../styles/components/ScheduleItem.module.scss"
import {IChurchSchedule} from "../../interfaces/Church";

interface IScheduleItem {
    data: IChurchSchedule
}

const ScheduleItem: React.FC<IScheduleItem> = ({data}) => {
    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <FiUsers/>
                <div>{data.text}</div>
            </div>
            <div className={styles.right}>
                <span><FiCalendar/>{data.day}</span>
                <span><FiClock/>{data.time}</span>
            </div>
        </div>
    )
}

export default ScheduleItem
