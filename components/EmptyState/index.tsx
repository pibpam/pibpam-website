import React from "react";
import styles from "../../styles/components/EmptyState.module.scss"
import {FiAlertOctagon} from "react-icons/fi";

interface IEmptyState {
    description?: string
}

const EmptyState: React.FC<IEmptyState> = ({description = "Não encontramos nada por aqui!"}) => {
    return (
        <div className={styles.container}>
            <div className={styles.thumb}>
                <div className={styles.content}>
                    <p><FiAlertOctagon/> Ops!</p>
                    <p>{description}</p>
                </div>
            </div>
            <div className={styles.backdrop}></div>
        </div>
    )
}

export default EmptyState
