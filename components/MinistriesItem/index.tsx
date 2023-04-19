import React from "react";
import {FiExternalLink} from "react-icons/fi";
import styles from "../../styles/components/MinistriesItem.module.scss";

interface IMinistriesItem {
    onClick: () => void
}
const MinistriesItem: React.FC<IMinistriesItem> = ({onClick}) => {
    return (
        <div className={styles.container} onClick={onClick}>
            <div className={styles.image}></div>
            <div className={styles.info}>
                <div>JUBAP</div>
                <div>Juventude Batista Pará de Minas</div>
                <div>Líder: Marco Oliveira</div>
            </div>
            <div className={styles.link}>
                <FiExternalLink/>
            </div>
        </div>
    )
}

export default MinistriesItem