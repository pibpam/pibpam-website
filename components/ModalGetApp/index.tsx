import React, { useContext, useEffect, useMemo, useState } from 'react';
import { AppContext } from '../../contexts/app';
import AppleStore from '../svgs/appleStore.svg'
import GooglePlay from '../svgs/googlePlay.svg'
import { useRouter } from 'next/router';
import { Container, Download } from './styles'

const ModalGetApp: React.FC = () => {
  const { isMobile, isApp } = useContext(AppContext)
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const isDesktop = useMemo(() => {
    return !isApp && isMobile
  }, [isApp, isMobile])

  const openApp = () => {
    const currentRoute = router.asPath.split('?')[0]
    try {
      window.location.href = 'pibpamapp://path' + currentRoute
    } catch (err: any) {
      alert(err.message)
    }
  }

  useEffect(() => {
    if (!isApp && isMobile) {
      // openApp()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isApp, isMobile])

  return (
    <>
      {(isDesktop && isOpen) && (
        <Container>
          <a onClick={openApp} >Abrir no App</a>
          <h2>
            Baixe o App e tenha uma experiência completa.
          </h2>
          <Download>
            <a href='https://play.google.com/store/apps/details?id=com.lucasmg37.pibpam' target='_blank' rel="noreferrer" >
              <GooglePlay />
            </a>
            <a href='https://apps.apple.com/br/app/pibpam/id6448954477' target='_blank' rel="noreferrer">
              <AppleStore />
            </a>
          </Download>
          <button onClick={() => setIsOpen(false)} >Fechar</button>
        </Container>
      )}
    </>
  );
}

export default ModalGetApp;
