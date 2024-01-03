import React from 'react';
import styles from "../../styles/components/ModalGetApp.module.scss"
import AppleStore from '../svgs/appleStore.svg'
import GooglePlay from '../svgs/googlePlay.svg'
import { useAppNavigation } from '../../hooks/useAppNavigation';

const AuthCodeModal: React.FC<{ name: string, code: string }> = ({ name, code }) => {
  const { goTo } = useAppNavigation()

  const openApp = () => {
    try {
      window.location.href = 'pibpamapp://path/auth/code/' + code
    } catch (err: any) {
      alert(err.message)
    }
  }

  if (!name) {
    return <></>
  }

  return (
    <div className={styles.container} >
      <h2>
        <strong> {name?.split(' ')[0]}, você está autenticado como membro em nossa aplicação. Para usar este usuário no app, clique no botão abaixo.</strong><br/> Se você ainda não tem o app instalado, faça o download na loja do seu dispositivo e refaça o processo. Em breve teremos a opção de login em ambas as plataformas.
      </h2>
      <a onClick={openApp} >Abrir no App</a>

      <div className={styles.download} >
        <a href='https://play.google.com/store/apps/details?id=com.lucasmg37.pibpam' target='_blank' rel="noreferrer" >
          <GooglePlay />
        </a>
        <a href='https://apps.apple.com/br/app/pibpam/id6448954477' target='_blank' rel="noreferrer">
          <AppleStore />
        </a>
      </div>
      <button onClick={() => goTo({ pathname: '/member', resetHistory: true})} >Ir para área de membros</button>
    </div>
  );
}

export default AuthCodeModal;