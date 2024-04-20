import Head from 'next/head';
import React, { ReactElement, useContext, useEffect } from 'react';
import TabNavigator from "../../../components/TabNavigator";
import Menu from "../../../components/Menu";
import { Container, Handler } from './styles';
import { AppContext } from '../../../contexts/app';

interface IWebsiteProps {
  children: ReactElement | ReactElement[]
  openMenu: boolean
  toggleMenu: () => void
  hasTabNavigator?: boolean
  changeScroll?: (top: number) => void,
  title?: string,
  img?: string
}

const Website: React.FC<IWebsiteProps> = ({
  title = 'PIB Pará de Minas',
  hasTabNavigator = true,
  children,
  openMenu,
  toggleMenu,
  img,
  changeScroll
}) => {

  const handleChangeScroll = () => {
    changeScroll && changeScroll(window.scrollY)
  }

  const { isApp } = useContext(AppContext)

  useEffect(() => {
    window.addEventListener("scroll", () => handleChangeScroll())

    return () => {
      window.removeEventListener("scroll", () => handleChangeScroll())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Primeira Igreja Batista em Pará de Minas" />
        <link rel="icon" href="/favicon.png" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content="Primeira Igreja Batista em Pará de Minas" />
        {/*<meta property="og:url" content="https://exemplo.com/"/>*/}
        {img && (<meta property="og:image" content={img} />)}
        <meta property="og:type" content="website" />
      </Head>
      <Container>
        {Array.isArray(children) && <Handler isApp={isApp}>
          <div>
            {children[0] || 'Ops! Algo deu errado'}
          </div>
          <div>
            {children[1] || 'Em criação'}
          </div>
        </Handler>}

        {!Array.isArray(children) && children}
      </Container>
      {hasTabNavigator && <TabNavigator />}
      {openMenu && <Menu toggleMenu={toggleMenu} />}
    </div>
  );
}

export default Website;
