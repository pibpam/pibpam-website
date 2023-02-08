import { useEffect, useRef, useState } from 'react';
import { FiPlayCircle } from 'react-icons/fi';
import YouTube, { YouTubePlayer } from 'react-youtube';
import styles from '../styles/components/YTPlayer.module.scss'

interface YTPlayerProps {
  videoId: string;
  autoplay: boolean;
  thumb?: string
}

const YTPlayer: React.FC<YTPlayerProps> = ({ videoId, autoplay, thumb }: YTPlayerProps) => {
  const [player, setPlayer] = useState<YouTubePlayer>();

  const [playing, setPlaying] = useState(false)
  const [width, setWidth] = useState(900)
  const playerContainer = useRef<null | HTMLDivElement>(null)

  const liberaPlayer = () => {
    setPlaying(true)
  }

  const getWidth = () => {
    if (playerContainer.current) {
      setWidth(playerContainer.current.clientWidth)
    } else {
      setTimeout(getWidth, 500)
    }
  }

  useEffect(() => {
    getWidth()
  }, [])

  return (
    <div ref={playerContainer} className={styles.container} style={{ height: (width * (9 / 16) + 'px') }} >
      {thumb && !playing ? (
        <div ref={playerContainer} className={styles.video__backdrop} >
          <button onClick={liberaPlayer} >
            <FiPlayCircle />
          </button>
        </div>
      ) : (
        <YouTube
          videoId={videoId}
          opts={{
            width: 100,
            height: 100 * (9 / 16),
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