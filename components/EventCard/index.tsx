import React from "react";
import styles from "../../styles/components/EventCard.module.scss"
import {FiPlayCircle} from "react-icons/fi";

interface IEventCard {
    onClick: () => void
}

const EventCard: React.FC<IEventCard> = ({onClick}) => {
    return (
        <div className={styles.container} onClick={onClick} >
            <div className={styles.tag__date} >
                14 mai, 2023
            </div>
            <div className={styles.thumb}>
                <div className={styles.content}>
                    <p>Celebração da Santa Ceia do Senhor</p>
                    <p>Pr. Alex Oliveira</p>
                </div>

                <div className={styles.backdrop}>
                    <FiPlayCircle/>
                </div>
            </div>
            <div className={styles.description} >
                <p>
                    Paulo mostra aos gálatas que há uma guerra em andamento entre a carne e o Espírito e somente aqueles
                    que andarem em Espírito é que sairão vitoriosos.
                </p>
            </div>
        </div>
    )
}

export default EventCard