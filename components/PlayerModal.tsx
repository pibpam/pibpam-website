import React, { useState } from 'react';
import YTPlayer from './YTPlayer';
import styles from '../styles/components/PlayerModal.module.scss'
import { FiX } from 'react-icons/fi';
import Divider, { EDividerColors } from './Divider';

interface IPlayerModalProps {
  title: string,
  description?: string,
  onClose: () => void,
  thumb: string,
  videoId: string,
}

const PlayerModal: React.FC<IPlayerModalProps> = ({ title, description, onClose, thumb, videoId }: IPlayerModalProps) => {

  const [close, setClose] = useState(false)

  const awaitAnimationToClose = () => {
    setClose(true)
    setTimeout(() => {
      onClose()
    }, 500)
  }

  return (
    <div className={`${styles.container} ${close && styles.close}`} >
      <button onClick={awaitAnimationToClose} ><FiX /></button>
      <div className={styles.content} >
        <h3>{title}</h3>
        {description && (<p>{description}</p>)}
        <div>
          <YTPlayer autoplay videoId={videoId} thumb={thumb} />
        </div>
      </div>
      <div className={styles.footer} >
        <Divider color={EDividerColors.white} />
      </div>
    </div>
  );
}

export default PlayerModal;