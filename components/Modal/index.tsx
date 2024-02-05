import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import { AppContext } from '../../contexts/app';
import 'react-spring-bottom-sheet/dist/style.css'
import { BlockClick } from './styles';

interface IModal {
  children: ReactElement
  onClose: () => void
  isOpen: boolean
}

const Modal: React.FC<IModal> = ({ children, onClose, isOpen }) => {
  const [maxHei, setMaxHei] = useState(0)
  const { isApp } = useContext(AppContext)

  useEffect(() => {
    if (window) {
      setMaxHei(window.screen.height - 60)
    }
  }, [])

  return (
    <>
      {isOpen && (
        <BlockClick />
      )}
      <BottomSheet maxHeight={isApp ? (maxHei || undefined) : undefined} onDismiss={onClose} open={isOpen}>
        {children}
      </BottomSheet>
    </>
  );
}

export default Modal;