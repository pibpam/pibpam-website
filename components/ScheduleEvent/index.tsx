import React from "react";
import styles from "../../styles/components/ScheduleEvent.module.scss"
import {FiCalendar, FiClock, FiExternalLink} from "react-icons/fi";

const ScheduleEvent: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.external_link}><FiExternalLink/></div>
            <div className={styles.thumb}>
                <div className={styles.content}>
                    <h4>ENJUBAP</h4>
                    <p>Encontro da Juventude Batista de Pará de Minas</p>
                    <div>
                        <div>Público: Adolescentes</div>
                        <div>
                            <span><FiCalendar/> 12/08</span>
                            <span><FiClock/> 19:30</span>
                        </div>
                    </div>
                </div>
                <div className={styles.backdrop}/>
            </div>
        </div>
    )
}

export default ScheduleEvent