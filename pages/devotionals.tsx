import type {NextPage} from 'next'
import styles from '../styles/Events.module.scss'
import Website from '../layout/container/Website'
import DividerMobile, {EDividerColors} from "../components/DividerMobile";
import Header from "../components/Header";
import useMenu from "../hooks/useMenu";
import HeaderPage from "../components/HeaderPage";

const Devotionals: NextPage = () => {
    const {open, toggleMenu} = useMenu()

    return (
        <Website openMenu={open} toggleMenu={toggleMenu} >
            <>
                <div className={styles.header_container}  >
                    <Header toggleMenu={toggleMenu} />
                </div>
                <HeaderPage
                    title={"Devocionais"}
                />
                <DividerMobile color={EDividerColors.white} />
            </>
        </Website>
    )
}

export default Devotionals
