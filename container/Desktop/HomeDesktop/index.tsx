import React from 'react';

import { BackgroundPlayer, Container, Warn, Welcome } from './styles';
import YTPlayer from '../../../components/YTPlayer';
import AppleStore from '../../../components/svgs/appleStore.svg'
import GooglePlay from '../../../components/svgs/googlePlay.svg'
import Logo from '../../../components/svgs/pibpamlogo.svg'

const HomeDesktop: React.FC = () => {
  return (
    <Container>
      <BackgroundPlayer>
        <div>
          <YTPlayer videoId="yTYRGwnJ1_g" autoplay controls={0} loop mute start={6} />
        </div>
      </BackgroundPlayer>
      <Welcome>
        <Warn>
          <Logo />
          <div>
            <h1>
              Olá! Que bom te ter aqui!
            </h1>
            <h2>
              Estamos construindo nosso site, mas em nosso Aplicativo (PIBPAM), você encontra-rá tudo o que você precisa saber sobre a Primeira Igreja Batista em Pará de Minas!
            </h2>
            <div className={'download'} >
              <a href='https://play.google.com/store/apps/details?id=com.lucasmg37.pibpam' target='_blank' rel="noreferrer" >
                <GooglePlay />
              </a>
              <a href='https://apps.apple.com/br/app/pibpam/id6448954477' target='_blank' rel="noreferrer">
                <AppleStore />
              </a>
            </div>
            <p>Se precisar, entre em contato pelo nosso e-mail ou telefone:</p>
            <div className={'contacts'} >
              <a href='mailto:secretariapibpam@gmail.com'>secretariapibpam@gmail.com</a>
              <a href='tel:+55373232-7250' >(37) 3232-7250</a>
            </div>
          </div>
        </Warn>
      </Welcome>
    </Container>
  );
}

export default HomeDesktop;