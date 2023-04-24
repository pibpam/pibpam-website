import React from "react";
import styles from "../../styles/components/EmptyState.module.scss"
import {FiAlertOctagon} from "react-icons/fi";

const EmptyState: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.thumb}>
                <div className={styles.content}>
                    <p> <FiAlertOctagon/>  Ops!</p>
                    <p>Não encontramos nada por aqui!</p>
                </div>
            </div>
            <div className={styles.backdrop}  ></div>
        </div>
    )
}

export default EmptyState
