import { FaSpotify } from "react-icons/fa"
import { FiFacebook, FiInstagram, FiYoutube } from "react-icons/fi"
import Divisor3 from '../svgs/divisor3.svg'
import PibPamLogo from '../svgs/pibpamlogo.svg'
import { Copy, FooterEl, FooterInfo } from './styles'

const Footer: React.FC = () => {
  return (
    <FooterEl>
      <Divisor3 />
      <FooterInfo>
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
              Agenda
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
      </FooterInfo>
      <Copy>
        © 2022 - Todos os direitos pertecem a Primeira Igreja Batista em Pará de Minas
      </Copy>
    </FooterEl>
  )
}

export default Footer
