import React from "react";
import styles from "../../styles/components/DevotionalCard.module.scss"

interface IDevotionalCard {
    onClick: () => void
}
const DevotionalCard: React.FC<IDevotionalCard> = ({onClick}) => {
    return (
        <div className={styles.container} onClick={onClick} >
            <div className={styles.tag__date}>
                14 mai, 2023
            </div>
            <div className={styles.thumb}>
                <div className={styles.content}>
                    <p>As bençãos do justo</p>
                    <p>Pr. Alex Oliveira</p>
                </div>

                <div className={styles.backdrop}/>
            </div>
        </div>
    )
}

export default DevotionalCard