import Head from 'next/head';
import React, { ReactElement, useContext, useEffect } from 'react';
import TabNavigator from "../../../components/TabNavigator";
import { Container } from './styles';
import { PostMessageContext } from '../../../contexts/postMessage';

interface IWebsiteProps {
  children: ReactElement | ReactElement[]
  hasTabNavigator?: boolean
  changeScroll?: (top: number) => void,
  title?: string,
  img?: string
}

const Website: React.FC<IWebsiteProps> = ({
  title = 'PIB Pará de Minas',
  hasTabNavigator = true,
  children,
  img,
  changeScroll
}) => {

  const handleChangeScroll = () => {
    changeScroll && changeScroll(window.scrollY)
  }

  const { deviceInfo } = useContext(PostMessageContext)

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
        {img && (<meta property="og:image" content={img} />)}
        <meta property="og:type" content="website" />
      </Head>
      <Container bottom={deviceInfo?.bottom}>
        {children}
      </Container>
      {hasTabNavigator && <TabNavigator />}
    </div>
  );
}

export default Website;
