import React, { useState } from 'react';
import YTPlayer from '../YTPlayer';
import { FiX } from 'react-icons/fi';
import Divider, { EDividerColors } from '../Divider';
import { Container, Content, Footer } from './styles'

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
    <Container $closing={close}>
      <button onClick={awaitAnimationToClose} ><FiX /></button>
      <Content>
        <h3>{title}</h3>
        {description && (<p>{description}</p>)}
        <div>
          <YTPlayer autoplay videoId={videoId} thumb={thumb} />
        </div>
      </Content>
      <Footer>
        <Divider color={EDividerColors.white} />
      </Footer>
    </Container>
  );
}

export default PlayerModal;
