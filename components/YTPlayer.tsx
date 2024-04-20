import React, { useEffect, useRef, useState } from 'react';
import { FiPlayCircle } from 'react-icons/fi';
import YouTube, { YouTubeEvent, YouTubePlayer } from 'react-youtube';
import styles from '../styles/components/YTPlayer.module.scss'

interface YTPlayerProps {
  videoId: string;
  autoplay?: boolean;
  thumb?: string
  controls?: number
  loop?: boolean
  mute?: boolean
}

const YTPlayer: React.FC<YTPlayerProps> = ({ videoId, autoplay = false, thumb, controls = 2, loop = false, mute = false }: YTPlayerProps) => {
  const [player, setPlayer] = useState<YouTubePlayer>();

  const playerRef = useRef<YouTubePlayer | undefined>()

  const [playing, setPlaying] = useState(true)
  const playerContainer = useRef<null | HTMLDivElement>(null)

  const liberaPlayer = () => {
    setPlaying(true)
  }

  const handleOnEnd = () => {
    if (playerRef.current && loop) {
      playerRef.current?.playVideo()
    }
  }

  const handleVisibilitychange = () => {
    if (document.visibilityState === "visible") {
      if (playerRef.current) {
        playerRef.current?.playVideo()
      }
    }
  }

  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilitychange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilitychange)
    }
  }, [])

  const handleReady = (event: YouTubeEvent) => {
    // setPlayer(event.target)
    playerRef.current = event.target
  }

  return (
    <div ref={playerContainer} className={styles.container}>
      {thumb && !playing ? (
        <div className={styles.video__backdrop} style={{ background: "url('" + thumb + "') center/cover" }}>
          <button onClick={liberaPlayer}>
            <FiPlayCircle />
          </button>
        </div>
      ) : (
        <YouTube
          videoId={videoId}
          opts={{
            playerVars: {
              autoplay: +autoplay,
              controls,
              loop: +loop,
              playsinline: 1,
              mute: +mute
            },
          }}
          className="container"
          onReady={handleReady}
          onEnd={handleOnEnd}
        />
      )}
    </div>);
};

export default YTPlayer;
