import React from "react";
import styles from "../../../styles/components/Home/ThumbVideo.module.scss"
import {FiPlayCircle} from "react-icons/fi";
const ThumbVideo: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <p>Celebração da Santa Ceia do Senhor</p>
                <p>Pr. Alex Oliveira</p>
            </div>

            <div className={styles.backdrop}  >
                <FiPlayCircle/>
            </div>
        </div>
    )
}

export default ThumbVideo