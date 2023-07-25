import React, { useContext, useMemo } from 'react';
import styles from "../../styles/components/Modal.module.scss"
import { AppContext } from '../../contexts/app';
import AppleStore from '../svgs/appleStore.svg'
import GooglePlay from '../svgs/googlePlay.svg'
import Logo from '../svgs/pibpamlogo.svg'

const Modal: React.FC = () => {
  const { isMobile, isApp } = useContext(AppContext)

  const isDesktop = useMemo(() => {
    return !isApp && !isMobile
  }, [isApp, isMobile])

  return (
    <>
      {isDesktop && (
        <div className={styles.container} >
          <Logo/>
          <div>
            <h1>
              Olá! Que bom te ter aqui!
            </h1>
            <h2>
              Estamos construindo nosso site, mas em nosso Aplicativo (PIBPAM), você encontra-rá tudo o que você precisa saber sobre a Primeira Igreja Batista em Pará de Minas!
            </h2>
            <div className={styles.download} >
              <a href='https://play.google.com/store/apps/details?id=com.lucasmg37.pibpam'target='_blank' rel="noreferrer" >
                <GooglePlay />
              </a>
              <a href='https://apps.apple.com/br/app/pibpam/id6448954477' target='_blank' rel="noreferrer">
                <AppleStore />
              </a>
            </div>
            <p>Se precisar, entre em contato pelo nosso e-mail ou telefone:</p>
            <div className={styles.contacts} >
              <a href='mailto:natalinasantos428@gmail.com'>natalinasantos428@gmail.com</a>
              <a href='tel:+553799979-4374' >(37) 99979-4374</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;