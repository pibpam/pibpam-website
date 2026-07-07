import React, { useEffect, useRef, useState } from 'react';
import { FiPlayCircle } from 'react-icons/fi';
import YouTube, { YouTubeEvent, YouTubePlayer } from 'react-youtube';
import { Container, VideoBackdrop } from './styles'

interface YTPlayerProps {
  videoId: string;
  autoplay?: boolean;
  thumb?: string
  controls?: number
  loop?: boolean
  mute?: boolean
  start?: number
}

const YTPlayer: React.FC<YTPlayerProps> = ({ videoId, autoplay = false, thumb, controls = 2, loop = false, mute = false, start = 0 }: YTPlayerProps) => {
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
      start && playerRef.current?.seekTo(start)
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
    <Container ref={playerContainer}>
      {thumb && !playing ? (
        <VideoBackdrop style={{ background: "url('" + thumb + "') center/cover" }}>
          <button onClick={liberaPlayer}>
            <FiPlayCircle />
          </button>
        </VideoBackdrop>
      ) : (
        <YouTube
          videoId={videoId}
          opts={{
            playerVars: {
              autoplay: +autoplay,
              controls,
              loop: +loop,
              playsinline: 1,
              mute: +mute,
              start
            },
          }}
          className="container"
          onReady={handleReady}
          onEnd={handleOnEnd}
        />
      )}
    </Container>);
};

export default YTPlayer;
