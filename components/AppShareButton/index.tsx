import React from 'react'
import { FiShare2 } from 'react-icons/fi'
import { Button } from '@/components/ui/Button'
import usePostMessage from '../../hooks/usePostMessage'

interface IAppShareButton {
  url: string
  message: string
  tone?: 'light' | 'dark'
}

/** Compartilha pelo app nativo (ou pela Web Share API fora dele). */
const AppShareButton: React.FC<IAppShareButton> = ({ url, message, tone = 'light' }) => {
  const { share } = usePostMessage()

  return (
    <Button variant={tone === 'dark' ? 'outline-inverse' : 'outline'} icon={<FiShare2 aria-hidden />} onClick={() => share(message, url)}>
      Compartilhar
    </Button>
  )
}

export default AppShareButton
