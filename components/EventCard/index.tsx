import React from "react";
import styles from "../../styles/components/EventCard.module.scss"
import {IContent} from "../../interfaces/Contens";
import {DateUtils} from "../../utils/Date";

interface IEventCard {
    onClick: () => void
    data: IContent
    hideDate?: boolean
}

const EventCard: React.FC<IEventCard> = ({onClick, data, hideDate = false}) => {
    return (
        <div className={styles.container} onClick={onClick}>
            {!hideDate && (
                <div className={styles.tag__date}>
                    {DateUtils.formatDateDefault(data.contentDate)}
                </div>
            )}
            <div className={styles.thumb}>
                <div className={styles.content}>
                    <p>{data.name}</p>
                    {data.author && (
                        <p>{data.author.name}</p>
                    )}
                </div>

                <div className={styles.backdrop} style={{background: "url('" + data.image + "') center/cover"}}>
                    {/*<FiPlayCircle/>*/}
                </div>
            </div>
            {/*<div className={styles.description}>*/}
            {/*    <p>{data.description}</p>*/}
            {/*</div>*/}
        </div>
    )
}

export default EventCard
