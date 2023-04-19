import type {NextPage} from 'next'
import styles from '../styles/Events.module.scss'
import Website from '../layout/container/Website'
import DividerMobile, {EDividerColors} from "../components/DividerMobile";
import Header from "../components/Header";
import useMenu from "../hooks/useMenu";
import HeaderPage from "../components/HeaderPage";
import MinistriesItem from "../components/MinistriesItem";
import FooterPage from "../components/FooterPage";
import {useRouter} from "next/router";

const Ministries: NextPage = () => {
    const {open, toggleMenu} = useMenu()
    const router = useRouter()

    const goTo =  async (pathname: string) => {
        await router.push({pathname})
    }

    return (
        <Website openMenu={open} toggleMenu={toggleMenu}>
            <>
                <div className={styles.header_container}>
                    <Header toggleMenu={toggleMenu}/>
                </div>
                <HeaderPage
                    title={"Ministérios"}
                />

                <DividerMobile color={EDividerColors.white}/>

                <div className={styles.container}>
                    <div className={styles.grid}>
                        <MinistriesItem onClick={() => goTo("/ministry/123")}/>
                        <MinistriesItem onClick={() => goTo("/ministry/123")}/>
                        <MinistriesItem onClick={() => goTo("/ministry/123")}/>
                        <MinistriesItem onClick={() => goTo("/ministry/123")}/>
                        <MinistriesItem onClick={() => goTo("/ministry/123")}/>
                        <MinistriesItem onClick={() => goTo("/ministry/123")}/>
                        <MinistriesItem onClick={() => goTo("/ministry/123")}/>
                        <MinistriesItem onClick={() => goTo("/ministry/123")}/>
                    </div>
                </div>
                <FooterPage/>
            </>
        </Website>
    )
}

export default Ministries
