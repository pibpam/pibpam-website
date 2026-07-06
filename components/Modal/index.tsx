import React, { ReactElement, useContext, useEffect, useMemo, useState } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import { FiX } from 'react-icons/fi';
import { AppContext } from '../../contexts/app';
import 'react-spring-bottom-sheet/dist/style.css'
import { BlockClick, DesktopCloseButton, DesktopDialog, DesktopOverlay } from './styles';

interface IModal {
  children: ReactElement
  onClose: () => void
  isOpen: boolean
  blockClick?: boolean
}

const Modal: React.FC<IModal> = ({ children, onClose, isOpen, blockClick = false }) => {
  const [maxHei, setMaxHei] = useState(0)
  const { isApp, isMobile } = useContext(AppContext)

  const isDesktop = useMemo(() => {
    return !isApp && !isMobile
  }, [isApp, isMobile])

  useEffect(() => {
    if (window) {
      setMaxHei(window.screen.height - 60)
    }
  }, [])

  useEffect(() => {
    if (!isDesktop || !isOpen) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isDesktop, isOpen, onClose])

  if (isDesktop) {
    return (
      <>
        {isOpen && (
          <DesktopOverlay onClick={onClose}>
            <DesktopDialog onClick={(event: React.MouseEvent<HTMLDivElement>) => event.stopPropagation()}>
              {children}
            </DesktopDialog>
            <DesktopCloseButton type="button" onClick={onClose} aria-label="Fechar">
              <FiX />
            </DesktopCloseButton>
          </DesktopOverlay>
        )}
      </>
    );
  }

  return (
    <>
      {isOpen && blockClick && (
        <BlockClick />
      )}
      <BottomSheet maxHeight={isApp ? (maxHei || undefined) : undefined} onDismiss={onClose} open={isOpen}>
        {children}
      </BottomSheet>
    </>
  );
}

export default Modal;