import React from "react";
import BlockHeader from "../BlockHeader";
import ThumbVideo from "../ThumbVideo";
import styles from "../../../styles/components/Home/Transmission.module.scss"
import SecondaryButton from "../../Button/Secondary";
import {FiPlay, FiVideo} from "react-icons/fi";

const Transmission: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.live}>
                <BlockHeader
                    icon={<FiVideo/>}
                    title="Estamos ao-vivo neste momento"
                />
                <div className={styles.content}>
                    <ThumbVideo/>
                </div>

                <SecondaryButton>
                    <><FiPlay/> Assistir Culto On-line</>
                </SecondaryButton>
            </div>

            <BlockHeader
                icon={<FiVideo/>}
                title="Assista a nossa última transmissão"
            />
            <div className={styles.content}>
                <ThumbVideo/>
            </div>
        </div>
    )
}

export default Transmission