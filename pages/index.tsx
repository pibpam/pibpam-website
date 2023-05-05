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
import {Api} from "../services/api";
import {IContent} from "../interfaces/Contens";
import {IScheduleDate} from "../interfaces/Schedule";
import {useContext} from "react";
import {LivesContext} from "../contexts/lives";
import useLoading from "../hooks/useLoading";
import Devotionals from "../components/Home/Devotionals";
import {IDevotinal} from "../interfaces/Devotinal";
import {useAppNavigation} from "../hooks/useAppNavigation";

interface IHome {
    content?: IContent
    schedules: IScheduleDate[]
    devotionals: IDevotinal[]
}

const Home: NextPage<IHome> = ({content, schedules, devotionals}) => {
    const {open, toggleMenu} = useMenu()
    const {lives} = useContext(LivesContext)
    const {handleClose, handleOpen} = useLoading()
    const {goTo: goToHook} = useAppNavigation()

    const goTo = async (pathname: string) => {
        await handleOpen()
        await goToHook({pathname})
        handleClose()
    }

    return (
        <Website openMenu={open} toggleMenu={toggleMenu}>
            <>
                <div className={styles.header_container}>
                    <Header toggleMenu={toggleMenu}/>
                </div>
                <Banner/>
                <DividerMobile/>
                <Intro goTo={goTo}/>
                <DividerMobile color={EDividerColors.white}/>
                <Transmission goTo={goTo} live={lives[0] || undefined} content={content}/>
                {schedules && schedules.length && (
                    <Schedule schedules={schedules} goTo={goTo}/>
                )}
                {devotionals && !!devotionals.length && (
                    <>
                        <DividerMobile color={EDividerColors.yellow}/>
                        <Devotionals devotionals={devotionals} goTo={goTo}/>
                    </>
                )}
                {/*<Series/>*/}
            </>
        </Website>
    )
}

export async function getServerSideProps() {
    const api = new Api()
    const schedules = await api.getSchedules(7)
    const content = await api.getContents(1)
    const devotionals = await api.getDevotionals(5)
    return {props: {content: content[0] || undefined, schedules, devotionals}}
}


export default Home
