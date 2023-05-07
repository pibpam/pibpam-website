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
import React from "react";
import {useAppNavigation} from "../hooks/useAppNavigation";
import useLoading from "../hooks/useLoading";
import {TextCollapse} from "../components/TextCollapse";

interface IAbout {
    data: IChurchInfo
}

const About: NextPage<IAbout> = ({data}) => {
    const {open, toggleMenu} = useMenu()
    const {goTo: goToHook} = useAppNavigation()
    const {handleOpen, handleClose} = useLoading()

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
                <HeaderPage
                    title={"Sobre a PIBPAM"}
                />
                <DividerMobile color={EDividerColors.white}/>
                <Title>História</Title>

                <div className={styles.description}>
                    <TextCollapse text={data.history || ""}/>
                </div>

                <Title>Pastor</Title>

                <div className={styles.description}>
                    <div className={styles.description}>
                        <TextCollapse text={data.shepherdText || ""}/>
                    </div>
                </div>

                <Title>Contatos</Title>
                <div className={styles.social_media}>
                    <p>{data.name}</p>

                    <button className={styles.button_link}>
                        <FiMail/> {data.email}
                    </button>
                    <button className={styles.button_link}>
                        <FiPhone/> {data.phoneNumber} // {data.whatsAppNumber}
                    </button>
                    <button className={styles.button_link}>
                        <FiGlobe/> {data.site}
                    </button>
                    <button className={styles.button_link_location}>
                        <FiMapPin/>
                        <div>
                            <div>
                                <span>Localização</span><a href="">Como chegar</a>
                            </div>
                            <div>
                                {data.address}
                            </div>
                        </div>
                    </button>
                </div>

                <Title>Redes sociais</Title>
                <div className={styles.social_media}>
                    <button className={styles.button_link}>
                        <FiYoutube/> {data.youTubeName}
                    </button>
                    <button className={styles.button_link}>
                        <FiInstagram/> {data.instagramName}
                    </button>
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

export async function getServerSideProps() {
    const api = new Api()
    const data = await api.getChurchInfo()
    return {props: {data}}
}

export default About
