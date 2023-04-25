import Head from 'next/head';
import React, {ReactElement} from 'react';
import TabNavigator from "../../../components/TabNavigator";
import Menu from "../../../components/Menu";
import useLoading from "../../../hooks/useLoading";
import styles from "../../../styles/components/WebSite.module.scss"

interface IWebsiteProps {
    children: ReactElement
    openMenu: boolean
    toggleMenu: () => void
    hasTabNavigator?: boolean
}

const Website: React.FC<IWebsiteProps> = ({hasTabNavigator = true, children, openMenu, toggleMenu}) => {
    const {isLoading} = useLoading()

    return (
        <div style={{
            height: openMenu || isLoading ? "100%" : "auto",
            overflow: openMenu || isLoading ? "hidden" : "auto"
        }}>
            <Head>
                <title>PIB Pará de Minas</title>
                <meta name="description" content="Primeira Igreja Batista em Pará de Minas"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className={styles.container}>
                {children}
            </main>
            {hasTabNavigator && <TabNavigator/>}
            {openMenu && <Menu toggleMenu={toggleMenu}/>}
        </div>
    );
}

export default Website;
