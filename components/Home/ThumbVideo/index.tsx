import React from "react";
import styles from "../../../styles/components/Home/ThumbVideo.module.scss"
import {FiPlayCircle} from "react-icons/fi";

interface IThumbVideo {
    title: string
    subtitle?: string
    background?: string
    onClick: () => void
}

const ThumbVideo: React.FC<IThumbVideo> = ({title, subtitle, background, onClick}) => {
    return (
        <div className={styles.container} onClick={onClick}>
            <div className={styles.content}>
                <p>{title}</p>
                <p>{subtitle}</p>
            </div>

            <div className={styles.backdrop} style={{background: "url('" + background + "') center/cover"}}>
                <FiPlayCircle/>
            </div>
        </div>
    )
}

export default ThumbVideo
