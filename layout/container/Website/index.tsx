import Head from 'next/head';
import React, {ReactElement, useEffect} from 'react';
import TabNavigator from "../../../components/TabNavigator";
import Menu from "../../../components/Menu";
import styles from "../../../styles/components/WebSite.module.scss"

interface IWebsiteProps {
    children: ReactElement
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

    useEffect(() => {
        window.addEventListener("scroll", () => handleChangeScroll())

        return () => {
            window.removeEventListener("scroll", () => handleChangeScroll())
        }
    }, [])

    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name="description" content="Primeira Igreja Batista em Pará de Minas"/>
                <link rel="icon" href="/favicon.png"/>
                <meta property="og:title" content={title}/>
                <meta property="og:description" content="Primeira Igreja Batista em Pará de Minas"/>
                {/*<meta property="og:url" content="https://exemplo.com/"/>*/}
                {img && (<meta property="og:image" content={img}/>)}
                <meta property="og:type" content="website"/>
            </Head>
            <main
                className={styles.container}>
                {children}
            </main>
            {hasTabNavigator && <TabNavigator/>}
            {openMenu && <Menu toggleMenu={toggleMenu}/>}
        </div>
    );
}

export default Website;
