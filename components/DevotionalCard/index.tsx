import React from "react";
import styles from "../../styles/components/DevotionalCard.module.scss"
import {IDevotinal} from "../../interfaces/Devotinal";
import {DateUtils} from "../../utils/Date";

interface IDevotionalCard {
    onClick: () => void
    devotional: IDevotinal
}

const DevotionalCard: React.FC<IDevotionalCard> = ({onClick, devotional}) => {
    return (
        <div className={styles.container} onClick={onClick}>
            <div className={styles.tag__date}>
                {DateUtils.formatDateDefault(devotional.contentDate)}
            </div>
            <div className={styles.thumb}>
                <div className={styles.content}>
                    <p>{devotional.title}</p>
                    {devotional?.author && (
                        <p>{devotional.author.name}</p>
                    )}
                </div>

                <div className={styles.backdrop} style={{background: "url('" + devotional.image + "') center/cover"}}/>
            </div>
        </div>
    )
}

export default DevotionalCard
