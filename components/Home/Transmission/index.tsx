import React from "react";
import BlockHeader from "../BlockHeader";
import ThumbVideo from "../ThumbVideo";
import styles from "../../../styles/components/Home/Transmission.module.scss"
import SecondaryButton from "../../Button/Secondary";
import {FiPlay, FiVideo} from "react-icons/fi";
import {IContent} from "../../../interfaces/Contens";

interface ITransmission {
    content?: IContent
    live?: IContent
    goTo: (pathname: string) => void
}

const Transmission: React.FC<ITransmission> = ({content, live, goTo}) => {
    return (
        <div className={styles.container}>
            {live && (
                <div className={styles.live}>
                    <BlockHeader
                        icon={<FiVideo/>}
                        title="Estamos ao-vivo neste momento"
                    />
                    <div className={styles.content}>
                        <ThumbVideo
                            title={live.name}
                            background={live.image}
                            subtitle={live.author?.name}
                            onClick={() => goTo("/event/" + live?.uuid)}
                        />
                    </div>

                    <SecondaryButton onClick={() => goTo("/event/" + live?.uuid)}>
                        <><FiPlay/> Assistir Culto On-line</>
                    </SecondaryButton>
                </div>
            )}
            {content && (
                <>
                    <BlockHeader
                        icon={<FiVideo/>}
                        title="Assista a nossa última transmissão"
                    />
                    <div className={styles.content}>
                        <ThumbVideo
                            title={content.name}
                            background={content.image}
                            subtitle={content.author?.name}
                            onClick={() => goTo("/event/" + content?.uuid)}
                        />
                    </div>
                </>
            )}
        </div>
    )
}

export default Transmission
