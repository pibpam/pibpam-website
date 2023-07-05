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
import {
    FiArrowRight,
    FiCalendar,
    FiGlobe,
    FiInstagram,
    FiMail,
    FiMapPin,
    FiPhone,
    FiPlay, FiUser,
    FiYoutube
} from "react-icons/fi";
import {Api} from "../services/api";
import {IChurchInfo} from "../interfaces/Church";
import React, {useEffect, useState} from "react";
import {useAppNavigation} from "../hooks/useAppNavigation";
import {TextCollapse} from "../components/TextCollapse";
import HeaderContainer from "../components/HeaderContainer";
import useHeader from "../hooks/useHeader";
import useOpenMap from "../hooks/useOpenMap";
import {FaSpotify} from "react-icons/fa";

import usePostMessage from "../hooks/usePostMessage";

interface IAbout {
    data: IChurchInfo
}

const About: NextPage<IAbout> = ({data}) => {
    const {open, toggleMenu} = useMenu()
    const {goTo: goToHook, goBack} = useAppNavigation()
    const {scrollActive, changeScroll} = useHeader()
    const {getHref} = useOpenMap()
    const {openLink} = usePostMessage()
    const [mapUrl, setMapUrl] = useState('')

    const goTo = async (pathname: string) => {
        await goToHook({pathname, showLoading: true})
    }

    useEffect(() => {
        setMapUrl(data.address ? getHref(data.address) : "")
    }, [data.address, getHref])

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
                    title={"Sobre a PIBPAM"}
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
                                <span>Localização</span>
                                {mapUrl && (
                                    <button onClick={() => openLink(mapUrl)}>
                                        Como chegar
                                    </button>
                                )}
                            </div>
                            <div>
                                {data.address}
                            </div>
                        </div>
                    </button>
                </div>

                <Title>Redes sociais</Title>
                <div className={styles.social_media}>
                    <button onClick={() => openLink(data.youTubeUrl || '')} className={styles.button_link}>
                        <FiYoutube/> {data.youTubeName}
                    </button>
                    <button onClick={() => openLink(data.instagramUrl || '')} className={styles.button_link}>
                        <FiInstagram/> {data.instagramName}
                    </button>
                    <button onClick={() => openLink(data.spotifyUrl || '')} className={styles.button_link}>
                        <FaSpotify/> {data.spotifyName}
                    </button>
                </div>

                {data?.church_schedules && !!data.church_schedules.length && (
                    <>
                        <Title>Horários</Title>
                        <div className={styles.schedule}>
                            {data.church_schedules.map(item => <ScheduleItem key={item.uuid} data={item}/>)}
                            <button onClick={() => goTo('/schedule')} className={styles.seeAllButton}>Ver agenda
                                completa <FiArrowRight/></button>
                        </div>
                    </>
                )}

                <Title>Congregações</Title>
                <div className={styles.congragations}>
                    <p>Congregação Batista em Ascensão</p>
                    <button className={styles.congragation_preach}>
                        <FiUser/>
                        <div>
                            <div>Pastor</div>
                            <div>
                                Aparecido de Oliveira
                            </div>
                        </div>
                    </button>
                    <button className={styles.button_link_location}>
                        <FiMapPin/>
                        <div>
                            <div>
                                <span>Localização</span>
                            </div>
                            <div>
                                Rua Pompéu, 49 - Ascensão
                            </div>
                        </div>
                    </button>
                </div>

                <Title>Horários - Ascensão</Title>
                <div className={styles.scheduleCongragations}>
                    <ScheduleItem data={{
                        uuid: '',
                        created_at: '',
                        text: 'EBD',
                        day: 'Quarta-feira',
                        time: '19:30'
                    }}/>

                    <ScheduleItem data={{
                        uuid: '',
                        created_at: '',
                        text: 'Exposição Bíblica',
                        day: 'Domingo',
                        time: '19:30'
                    }}/>
                </div>

                <FooterPage
                    options={[
                        {
                            text: "Cultos",
                            icon: <FiPlay/>,
                            action: () => goTo("/events")
                        },
                        {
                            text: "Agenda",
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
    const data = await api.getChurchInfo()
    return {props: {data}}
}

export default About
