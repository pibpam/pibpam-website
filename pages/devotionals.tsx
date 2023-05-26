import type {NextPage} from 'next'
import styles from '../styles/Events.module.scss'
import Website from '../layout/container/Website'
import DividerMobile, {EDividerColors} from "../components/DividerMobile";
import Header from "../components/Header";
import useMenu from "../hooks/useMenu";
import HeaderPage from "../components/HeaderPage";
import DevotionalCard from "../components/DevotionalCard";
import {FiCalendar, FiPlay} from "react-icons/fi";
import React from "react";
import FooterPage from "../components/FooterPage";
import {IDevotinal} from "../interfaces/Devotinal";
import EmptyState from "../components/EmptyState";
import {Api} from "../services/api";
import {useAppNavigation} from "../hooks/useAppNavigation";
import useHeader from "../hooks/useHeader";
import HeaderContainer from "../components/HeaderContainer";

interface IDevotionalsPage {
    data: IDevotinal[]
}

const Devotionals: NextPage<IDevotionalsPage> = ({data}) => {
    const {open, toggleMenu} = useMenu()
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
                <HeaderPage
                    title={"Devocionais"}
                />
                <DividerMobile color={EDividerColors.white}/>
                <div className={styles.container}>
                    <div className={styles.grid}>
                        {
                            data.map(item => <DevotionalCard devotional={item} key={item.uuid}
                                                             onClick={() => goTo("/devotional/" + item.uuid)}/>)
                        }

                        {!data.length && (
                            <EmptyState/>
                        )}

                    </div>
                    {/*<ThirdButton>*/}
                    {/*    <><FiPlus/> ver mais</>*/}
                    {/*</ThirdButton>*/}
                </div>
                <FooterPage
                    options={[
                        {
                            text: "Cultos",
                            icon: <FiPlay/>,
                            action: () => goTo("/events")
                        },
                        {
                            text: "Programação",
                            icon: <FiCalendar/>,
                            action: () => goTo("/schedule")
                        }
                    ]}
                />
            </>
        </Website>
    )
}

export async function getStaticProps() {
    const api = new Api()
    const data = await api.getDevotionals()
    return {props: {data}}
}

export default Devotionals
