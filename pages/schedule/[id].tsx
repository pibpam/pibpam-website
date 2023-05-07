import type {NextPage} from 'next'
import styles from '../../styles/SchedulePage.module.scss'
import Website from '../../layout/container/Website'
import DividerMobile, {EDividerColors} from "../../components/DividerMobile";
import Header from "../../components/Header";
import useMenu from "../../hooks/useMenu";
import HeaderPage from "../../components/HeaderPage";
import React from "react";
import {FiAlertOctagon, FiCalendar, FiClock, FiEdit3, FiInfo, FiMapPin, FiUsers} from "react-icons/fi";
import ThirdButton from "../../components/Button/Third";
import Title from "../../components/Title";
import {Api} from "../../services/api";
import {IScheduleDate} from "../../interfaces/Schedule";
import {DateUtils} from "../../utils/Date";
import MinistriesItem from "../../components/MinistriesItem";
import {Platform} from "../../enum/Platform";
import {useAppNavigation} from "../../hooks/useAppNavigation";

interface IParams {
    params: {
        id: string
    }
    query?: {
        platform?: Platform
    }
}

interface ISchedule {
    data: IScheduleDate
    platform?: Platform
}

const Schedule: NextPage<ISchedule> = ({data, platform}) => {
    const {open, toggleMenu} = useMenu()
    const {goTo: goToHook} = useAppNavigation()

    const goBack = async () => {
        await goToHook({pathname: "/schedule", showLoading: true})
    }

    const goToTeam = async () => {
        await goToHook({pathname: "/ministry/" + data.schedule.team?.uuid, showLoading: true})
    }

    const goToEnrollmentLink = () => {
        window.open(data.schedule.enrollmentLink)
    }

    const goToMap = (): string => {
        if (platform === Platform.IOS) {
            return "maps:" + data.schedule.addressRedirect
        }

        if (platform === Platform.ANDROID) {
            return "geo:" + data.schedule.addressRedirect
        }

        return "https://www.google.com/maps/dir/?api=1&destination=" + data.schedule.addressRedirect
    }

    return (
        <Website hasTabNavigator={false} openMenu={open} toggleMenu={toggleMenu}>
            <>
                <div className={styles.header_container}>
                    <Header goBack={goBack} toggleMenu={toggleMenu}/>
                </div>
                <HeaderPage background={data.schedule.image}/>
                <DividerMobile color={EDividerColors.white}/>
                <div className={styles.begin}>
                    <h1>{data.schedule.title}</h1>
                    <h2>{data.schedule.shortDescription}</h2>
                    <div className={styles.date_time}>
                        <div><FiCalendar/>{DateUtils.formatDateDefault(data.scheduleDate)}</div>
                        <div><FiClock/>{DateUtils.formatTimeH(data.scheduleDate)}</div>
                    </div>
                    {data.schedule.address && (
                        <div className={styles.location}>
                            <FiMapPin/>
                            <div>
                                <div>{data.schedule.address}</div>
                                <a href={goToMap()} target={"_blank"} rel="noreferrer">Como chegar</a>
                            </div>
                        </div>
                    )}
                    {data.schedule.publicSchedule && (
                        <div className={styles.audience}>
                            <FiUsers/>
                            <div>
                                <div>Público:</div>
                                <div>{data.schedule.publicSchedule}</div>
                            </div>
                        </div>
                    )}
                    {data.schedule.vacancies && (
                        <div className={styles.alert}>
                            <FiAlertOctagon/> Vagas limitadas.
                        </div>
                    )}

                    {data.schedule.enrollmentLink && (
                        <div className={styles.subscription_button}>
                            <ThirdButton onClick={goToEnrollmentLink}>
                                <><FiEdit3/>inscrição</>
                            </ThirdButton>
                        </div>
                    )}
                </div>
                {(data.schedule.description || data.schedule.extraData) && (
                    <>
                        <Title>Descrição</Title>
                        <div className={styles.description}>
                            <p>{data.schedule.description}</p>
                            {data.schedule.extraData && (
                                <div className={styles.alert_multiline}>
                                    <FiInfo/>
                                    <div>
                                        <div>Mais informações:</div>
                                        <div>{data.schedule.extraData}</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                )}

                {data.schedule.team && (
                    <>
                        <Title>Organizador</Title>
                        <div className={styles.container}>
                            <MinistriesItem data={data.schedule.team} onClick={goToTeam}/>
                        </div>
                    </>
                )}
            </>
        </Website>
    )
}

export async function getServerSideProps({params, query}: IParams) {
    const api = new Api()
    const data = await api.getSchedule(params.id)
    return {props: {data, platform: query?.platform || null}}
}


export default Schedule
