import Head from 'next/head';
import React, {ReactElement} from 'react';
import TabNavigator from "../../../components/TabNavigator";
import Menu from "../../../components/Menu";

interface IWebsiteProps {
    children: ReactElement
    openMenu: boolean
    toggleMenu: () => void
    hasTabNavigator?: boolean
}

const Website: React.FC<IWebsiteProps> = ({hasTabNavigator = true, children, openMenu, toggleMenu}) => {
    return (
        <div style={{height: openMenu ? "100%" : "auto", overflow: openMenu ? "hidden" : "auto"}}>
            <Head>
                <title>PIB Pará de Minas</title>
                <meta name="description" content="Primeira Igreja Batista em Pará de Minas"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main>
                {children}
            </main>
            {hasTabNavigator && <TabNavigator/>}
            {openMenu && <Menu toggleMenu={toggleMenu}/>}
        </div>
    );
}

export default Website;
