import type {NextPage} from 'next'
import styles from '../styles/About.module.scss'
import Website from '../layout/container/Website'
import DividerMobile, {EDividerColors} from "../components/DividerMobile";
import Header from "../components/Header";
import useMenu from "../hooks/useMenu";
import HeaderPage from "../components/HeaderPage";
import Title from "../components/Title";
import FooterPage from "../components/FooterPage";
import ScheduleItem from "../components/ScheduleItem";
import {FiCalendar, FiGlobe, FiInstagram, FiMail, FiMapPin, FiPhone, FiPlay, FiYoutube} from "react-icons/fi";
import {Api} from "../services/api";
import {IChurchInfo} from "../interfaces/Church";
import React, {useMemo} from "react";
import {useAppNavigation} from "../hooks/useAppNavigation";
import {TextCollapse} from "../components/TextCollapse";
import HeaderContainer from "../components/HeaderContainer";
import useHeader from "../hooks/useHeader";
import {Platform} from "../enum/Platform";
import useOpenMap from "../hooks/useOpenMap";

interface IAbout {
    data: IChurchInfo
    platform?: Platform
}

const About: NextPage<IAbout> = ({data, platform}) => {
    const {open, toggleMenu} = useMenu()
    const {goTo: goToHook, goBack} = useAppNavigation()
    const {scrollActive, changeScroll} = useHeader()
    const {getHref} = useOpenMap()

    const goTo = async (pathname: string) => {
        await goToHook({pathname, showLoading: true})
    }

    const goToMap = (): string => {
        return data.address ? getHref(data.address, platform) : ""
    }

    const phonesStr = () => {
        if (data.phoneNumber && data.whatsAppNumber) {
            return `${data.phoneNumber} // ${data.whatsAppNumber}`
        }

        if (data.phoneNumber) {
            return data.phoneNumber
        }
        return data.whatsAppNumber
    }

    return (
        <Website hasTabNavigator={false} changeScroll={changeScroll} openMenu={open} toggleMenu={toggleMenu}>
            <>
                <HeaderContainer active={scrollActive}>
                    <Header goBack={() => goBack({})} toggleMenu={toggleMenu}/>
                </HeaderContainer>

                <HeaderPage
                    title={"Sobre a PIBPAM" + platform}
                />
                <DividerMobile color={EDividerColors.white}/>
                <Title>História</Title>

                <div className={styles.description}>
                    <TextCollapse text={data.history || ""}/>
                </div>

                {/*<Title>Pastor</Title>*/}

                {/*<div className={styles.description}>*/}
                {/*    <div className={styles.description}>*/}
                {/*        <TextCollapse text={data.shepherdText || ""}/>*/}
                {/*    </div>*/}
                {/*</div>*/}

                <Title>Contatos</Title>
                <div className={styles.social_media}>
                    <p>{data.name}</p>

                    <button className={styles.button_link}>
                        <FiMail/> {data.email}
                    </button>
                    {!!phonesStr() && (
                        <button className={styles.button_link}>
                            <FiPhone/> {phonesStr()}
                        </button>
                    )}
                    {!!data.site && (
                        <button className={styles.button_link}>
                            <FiGlobe/> {data.site}
                        </button>
                    )}
                    <button className={styles.button_link_location}>
                        <FiMapPin/>
                        <div>
                            <div>
                                <span>Localização</span><a href={goToMap()} target={"_blank"} rel="noreferrer">Como
                                chegar</a>
                            </div>
                            <div>
                                {data.address}
                            </div>
                        </div>
                    </button>
                </div>

                <Title>Redes sociais</Title>
                <div className={styles.social_media}>
                    <a href={data.youTubeUrl} target={"_blank"} className={styles.button_link} rel="noreferrer">
                        <FiYoutube/> {data.youTubeName}
                    </a>
                    <a href={data.instagramUrl} target={"_blank"} className={styles.button_link} rel="noreferrer">
                        <FiInstagram/> {data.instagramName}
                    </a>
                </div>

                {data?.church_schedules && !!data.church_schedules.length && (
                    <>
                        <Title>Horários</Title>
                        <div className={styles.schedule}>
                            {data.church_schedules.map(item => <ScheduleItem key={item.uuid} data={item}/>)}
                        </div>
                    </>
                )}
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

interface IParams {
    query?: {
        platform?: Platform
    }
}


export async function getStaticProps({query}: IParams) {
    const api = new Api()
    const data = await api.getChurchInfo()
    return {props: {data, platform: query?.platform || null}}
}

export default About
