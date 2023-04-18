import type {NextPage} from 'next'
import styles from '../styles/Home.module.scss'
import {EDividerColors} from '../components/Divider'
import Website from '../layout/container/Website'
import Banner from "../components/Home/Banner";
import DividerMobile from "../components/DividerMobile";
import Header from "../components/Header";
import Intro from "../components/Home/Intro";
import Transmission from "../components/Home/Transmission";
import Schedule from "../components/Home/Schedule";
import Series from "../components/Home/Series";
import useMenu from "../hooks/useMenu";

const Home: NextPage = () => {
    const {open, toggleMenu} = useMenu()

    return (
        <Website openMenu={open} toggleMenu={toggleMenu} >
            <>
                <div className={styles.header_container}  >
                    <Header toggleMenu={toggleMenu} />
                </div>
                <Banner/>
                <DividerMobile/>
                <Intro/>
                <DividerMobile color={EDividerColors.white}/>
                <Transmission/>
                <Schedule/>
                <DividerMobile color={EDividerColors.yellow}/>
                <Series/>
            </>
        </Website>
    )
}

export default Home
