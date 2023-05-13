import type {NextPage} from 'next'
import {EDividerColors} from '../components/Divider'
import Website from '../layout/container/Website'
import Banner from "../components/Home/Banner";
import DividerMobile from "../components/DividerMobile";
import Header from "../components/Header";
import Intro from "../components/Home/Intro";
import Transmission from "../components/Home/Transmission";
import Schedule from "../components/Home/Schedule";
import useMenu from "../hooks/useMenu";
import {Api} from "../services/api";
import {IContent} from "../interfaces/Contens";
import {IScheduleDate} from "../interfaces/Schedule";
import {useContext, useState} from "react";
import {LivesContext} from "../contexts/lives";
import Devotionals from "../components/Home/Devotionals";
import {IDevotinal} from "../interfaces/Devotinal";
import {useAppNavigation} from "../hooks/useAppNavigation";
import HeaderContainer from "../components/HeaderContainer";
import useHeader from "../hooks/useHeader";

interface IHome {
    content?: IContent
    schedules: IScheduleDate[]
    devotionals: IDevotinal[]
}

const Home: NextPage<IHome> = ({content, schedules, devotionals}) => {
    const {open, toggleMenu} = useMenu()
    const {lives} = useContext(LivesContext)
    const {goTo: goToHook} = useAppNavigation()
    const {scrollActive, changeScroll} = useHeader()

    const goTo = async (pathname: string) => {
        await goToHook({pathname, showLoading: true})
    }

    return (
        <Website changeScroll={changeScroll} openMenu={open} toggleMenu={toggleMenu}>
            <>
                <HeaderContainer active={scrollActive} >
                    <Header toggleMenu={toggleMenu}/>
                </HeaderContainer>
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
    const content = await api.getContents(1, 1)
    const devotionals = await api.getDevotionals(5)
    return {props: {content: content.data[0] || undefined, schedules, devotionals}}
}


export default Home
