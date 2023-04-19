import type {NextPage} from 'next'
import styles from '../styles/Bible.module.scss'
import Website from '../layout/container/Website'
import DividerMobile, {EDividerColors} from "../components/DividerMobile";
import Header from "../components/Header";
import useMenu from "../hooks/useMenu";

const Bible: NextPage = () => {
    const {open, toggleMenu} = useMenu()

    return (
        <Website openMenu={open} toggleMenu={toggleMenu} >
            <>
                <div className={styles.header_container}  >
                    <Header title={"Bíblia"} toggleMenu={toggleMenu} />
                </div>
                <DividerMobile color={EDividerColors.white} />
                <div className={styles.container}></div>
            </>
        </Website>
    )
}

export default Bible
