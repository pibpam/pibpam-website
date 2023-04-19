import type {NextPage} from 'next'
import styles from '../styles/Events.module.scss'
import Website from '../layout/container/Website'
import DividerMobile, {EDividerColors} from "../components/DividerMobile";
import Header from "../components/Header";
import useMenu from "../hooks/useMenu";
import HeaderPage from "../components/HeaderPage";
import MinistriesItem from "../components/MinistriesItem";
import FooterPage from "../components/FooterPage";

const Ministries: NextPage = () => {
    const {open, toggleMenu} = useMenu()

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
                        <MinistriesItem/>
                        <MinistriesItem/>
                        <MinistriesItem/>
                        <MinistriesItem/>
                        <MinistriesItem/>
                        <MinistriesItem/>
                        <MinistriesItem/>
                        <MinistriesItem/>
                    </div>
                </div>
                <FooterPage/>
            </>
        </Website>
    )
}

export default Ministries
