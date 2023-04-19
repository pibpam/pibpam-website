import React from "react";
import styles from "../../styles/components/LivePage.module.scss"
import YTPlayer from "../YTPlayer";
import {FiCalendar} from "react-icons/fi";

interface ILivePage {
    isVod?: boolean
}

const LivePage: React.FC<ILivePage> = ({isVod = false}) => {
    return (
        <div className={styles.container}>
            <h1>Celebração da Santa ceia do Senhor</h1>
            <div className={styles.header}>
                <div>
                    <div></div>
                    Pr. Alex Oliveira
                </div>
                {isVod ? (<div className={styles.tag_date}><FiCalendar/>14 mai, 2023</div>) : (
                    <div className={styles.tag_live}>Ao Vivo</div>)}

            </div>
            <YTPlayer videoId={"7YjjOXA30_M"} thumb={"sdad"}/>
            <p>
                Paulo mostra aos gálatas que há uma guerra em andamento entre a carne e o Espírito e somente aqueles que
                andarem em Espírito é que sairão vitoriosos.
            </p>
        </div>
    )
}

export default LivePage