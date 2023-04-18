import Head from 'next/head';
import React, { ReactElement } from 'react';
import Footer from '../../../components/Footer';
import NavBar from '../../../components/NavBar';
import TabNavigator from "../../../components/TabNavigator";

interface IWebsiteProps {
  children: ReactElement
}

const Website: React.FC<IWebsiteProps> = ({children}) => {
  return (
    <div>
      <Head>
        <title>PIB Pará de Minas</title>
        <meta name="description" content="Primeira Igreja Batista em Pará de Minas" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {/*<NavBar />*/}
        {children}
        {/*<Footer />*/}
      </main>
        <TabNavigator/>
    </div>
  );
}

export default Website;