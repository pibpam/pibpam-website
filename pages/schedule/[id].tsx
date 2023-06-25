import type {NextPage} from 'next'
import styles from '../../styles/SchedulePage.module.scss'
import Website from '../../layout/container/Website'
import DividerMobile, {EDividerColors} from "../../components/DividerMobile";
import Header from "../../components/Header";
import useMenu from "../../hooks/useMenu";
import HeaderPage from "../../components/HeaderPage";
import React, {useEffect, useState} from "react";
import {FiAlertOctagon, FiCalendar, FiClock, FiEdit3, FiInfo, FiMapPin, FiUsers} from "react-icons/fi";
import ThirdButton from "../../components/Button/Third";
import Title from "../../components/Title";
import {Api} from "../../services/api";
import {IScheduleDate} from "../../interfaces/Schedule";
import {DateUtils} from "../../utils/Date";
import MinistriesItem from "../../components/MinistriesItem";
import {useAppNavigation} from "../../hooks/useAppNavigation";
import useHeader from "../../hooks/useHeader";
import HeaderContainer from "../../components/HeaderContainer";
import useOpenMap from "../../hooks/useOpenMap";
import usePostMessage from "../../hooks/usePostMessage";

interface IParams {
    params: {
        id: string
    }
}

interface ISchedule {
    data: IScheduleDate
}

const Schedule: NextPage<ISchedule> = ({data}) => {
    const {open, toggleMenu} = useMenu()
    const {goTo: goToHook, goBack} = useAppNavigation()
    const {scrollActive, changeScroll} = useHeader()
    const {getHref} = useOpenMap()
    const [mapUrl, setMapUrl] = useState('')
    const {openLink} = usePostMessage()

    useEffect(() => {
        setMapUrl(data.schedule.addressRedirect ? getHref(data.schedule.addressRedirect) : "")
    }, [data.schedule.addressRedirect, getHref])

    const goToTeam = async () => {
        await goToHook({pathname: "/ministry/" + data.schedule.team?.uuid, showLoading: true})
    }

    const goToEnrollmentLink = () => {
        if (data.schedule.enrollmentLink) {
            openLink(data.schedule.enrollmentLink)
        }
    }

    return (
        <Website changeScroll={changeScroll} hasTabNavigator={false} openMenu={open} toggleMenu={toggleMenu}>
            <>
                <HeaderContainer active={scrollActive}>
                    <Header goBack={() => goBack({})} toggleMenu={toggleMenu}/>
                </HeaderContainer>
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
                                <button onClick={() => openLink(mapUrl)}>Como chegar</button>
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

export async function getServerSideProps({params}: IParams) {
    const api = new Api()
    const data = await api.getSchedule(params.id)
    if (!data) {
        return {
            notFound: true,
        };
    }
    return {props: {data}}
}


export default Schedule
