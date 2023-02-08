import { FaSpotify } from "react-icons/fa"
import { FiFacebook, FiInstagram, FiYoutube } from "react-icons/fi"
import Divisor3 from '../components/svgs/divisor3.svg'
import PibPamLogo from '../components/svgs/pibpamlogo.svg'

import styles from '../styles/components/Footer.module.scss'

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <Divisor3 />
      <div className={styles.footerInfo} >
        <div>
          <PibPamLogo />
        </div>
        <div>
          <h4>Contatos</h4>
          <p>Primeira Igreja  Batista em Pará de Minas</p>
          <p>
            Tel: (37) 3232-3070<br />
            Whatsapp: (37) 9 9999-9999
          </p>
          <p>E-mail: emailtal@pibparademinas.com.br</p>
          <p>Av. Presidente Vargas - XXXX<br />
            Providência - Pará de Minas - MG</p>
        </div>
        <div>
          <h4>Acesso Rápido</h4>
          <ul>
            <li>
              Ministérios
            </li>
            <li>
              Programação
            </li>
            <li>
              Cultos
            </li>
            <li>
              Séries
            </li>
          </ul>
        </div>
        <div>
          <h4>Redes Sociais</h4>
          <ul>
            <li> <FiYoutube /> YouTube</li>
            <li> <FiInstagram /> Instagram</li>
            <li> <FiFacebook /> Facebook</li>
            <li> <FaSpotify /> Spotify</li>
          </ul>
        </div>
      </div>
      <div className={styles.copy}>
        © 2022 - Todos os direitos pertecem a Primeira Igreja Batista em Pará de Minas
      </div>
    </footer>
  )
}

export default Footer