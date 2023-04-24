import React, {useEffect, useRef, useState} from 'react';
import {FiPlayCircle} from 'react-icons/fi';
import YouTube, {YouTubePlayer} from 'react-youtube';
import styles from '../styles/components/YTPlayer.module.scss'

interface YTPlayerProps {
    videoId: string;
    autoplay?: boolean;
    thumb?: string
}

const YTPlayer: React.FC<YTPlayerProps> = ({videoId, autoplay = false, thumb}: YTPlayerProps) => {
    const [player, setPlayer] = useState<YouTubePlayer>();

    const [playing, setPlaying] = useState(false)
    const playerContainer = useRef<null | HTMLDivElement>(null)

    const liberaPlayer = () => {
        setPlaying(true)
    }

    return (
        <div ref={playerContainer} className={styles.container}>
            {thumb && !playing ? (
                <div className={styles.video__backdrop} style={{background: "url('" + thumb + "') center/cover"}}>
                    <button onClick={liberaPlayer}>
                        <FiPlayCircle/>
                    </button>
                </div>
            ) : (
                <YouTube
                    videoId={videoId}
                    opts={{
                        playerVars: {
                            autoplay,
                            controls: 2,
                        },
                    }}
                    className="container"
                    onReady={(event) => setPlayer(event.target)}
                />
            )}
        </div>);
};

export default YTPlayer;
