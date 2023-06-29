import Head from 'next/head';
import React, {ReactElement, useEffect} from 'react';
import TabNavigator from "../../../components/TabNavigator";
import Menu from "../../../components/Menu";
import useLoading from "../../../hooks/useLoading";
import styles from "../../../styles/components/WebSite.module.scss"

interface IWebsiteProps {
    children: ReactElement
    openMenu: boolean
    toggleMenu: () => void
    hasTabNavigator?: boolean
    changeScroll?: (top: number) => void,
    title?: string,
}

const Website: React.FC<IWebsiteProps> = ({title = 'PIB Pará de Minas', hasTabNavigator = true, children, openMenu, toggleMenu, changeScroll}) => {
    const {isLoading} = useLoading()

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
        <div
            style={{
                // height: openMenu || isLoading ? "100%" : "auto",
                // overflow: openMenu || isLoading ? "hidden" : "auto"
            }}>
            <Head>
                <title>{title}</title>
                <meta name="description" content="Primeira Igreja Batista em Pará de Minas"/>
                <link rel="icon" href="/favicon.png"/>
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
