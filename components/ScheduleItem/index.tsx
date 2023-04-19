import React from "react";
import {FiCalendar, FiClock, FiUsers} from "react-icons/fi";
import styles from "../../styles/components/ScheduleItem.module.scss"

const ScheduleItem: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <FiUsers/>
                <div>Culto de Exposição Bíblica</div>
            </div>
            <div className={styles.right}>
                <span><FiCalendar/>Quartas-Feiras</span>
                <span><FiClock/>19:30</span>
            </div>
        </div>
    )
}

export default ScheduleItem