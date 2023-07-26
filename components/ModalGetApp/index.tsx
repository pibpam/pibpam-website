import React, { useContext, useEffect, useMemo, useState } from 'react';
import styles from "../../styles/components/ModalGetApp.module.scss"
import { AppContext } from '../../contexts/app';
import AppleStore from '../svgs/appleStore.svg'
import GooglePlay from '../svgs/googlePlay.svg'
import { FiX } from 'react-icons/fi';
import { useRouter } from 'next/router';

const ModalGetApp: React.FC = () => {
  const { isMobile, isApp } = useContext(AppContext)
  const [isOpen, setIsOpen] = useState(true)
  const router = useRouter()

  const isDesktop = useMemo(() => {
    return !isApp && isMobile
  }, [isApp, isMobile])

  useEffect(() => {
    if (!isApp && isMobile) {
      const currentRoute = router.asPath.split('?')[0]
      try {
        // window.location.href = 'pibpamapp://path' + currentRoute
        window.open('pibpamapp://path' + currentRoute, '_blank')
      } catch(err: any) {
        alert(err.message)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isApp, isMobile])

  return (
    <>
      {(isDesktop && isOpen) && (
        <div className={styles.container} >
          <button onClick={() => setIsOpen(false)} >Fechar <FiX /></button>
          <h2>
            Baixe o App e tenha uma experiência completa.
          </h2>
          <div className={styles.download} >
            <a href='https://play.google.com/store/apps/details?id=com.lucasmg37.pibpam' target='_blank' rel="noreferrer" >
              <GooglePlay />
            </a>
            <a href='https://apps.apple.com/br/app/pibpam/id6448954477' target='_blank' rel="noreferrer">
              <AppleStore />
            </a>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalGetApp;