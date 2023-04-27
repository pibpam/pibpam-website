import React from "react";
import {FiExternalLink} from "react-icons/fi";
import styles from "../../styles/components/MinistriesItem.module.scss";
import {ITeam} from "../../interfaces/Team";

interface IMinistriesItem {
    onClick: () => void
    data: ITeam
}

const MinistriesItem: React.FC<IMinistriesItem> = ({onClick, data}) => {
    return (
        <div className={styles.container} onClick={onClick}>
            <div className={styles.image} style={{background: "url('" + data.image + "') center/cover"}}></div>
            <div className={styles.info}>
                <div>{data.name}</div>
                <div>{data.shortDescription}</div>
                {/*<div>Líder: Marco Oliveira</div>*/}
            </div>
            <div className={styles.link}>
                <FiExternalLink/>
            </div>
        </div>
    )
}

export default MinistriesItem
