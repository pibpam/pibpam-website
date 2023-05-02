import type {NextPage} from 'next'
import styles from '../styles/Schedule.module.scss'
import Website from '../layout/container/Website'
import DividerMobile, {EDividerColors} from "../components/DividerMobile";
import Header from "../components/Header";
import useMenu from "../hooks/useMenu";
import HeaderPage from "../components/HeaderPage";
import Title from "../components/Title";
import ScheduleItem from "../components/ScheduleItem";
import ScheduleEvent from "../components/ScheduleEvent";
import FooterPage from "../components/FooterPage";
import ProgramCard from "../components/ProgramCard";
import {FiBookOpen, FiPlay} from "react-icons/fi";
import ThirdButton from "../components/Button/Third";
import React from "react";
import {useRouter} from "next/router";
import {Api} from "../services/api";
import {IScheduleDate} from "../interfaces/Schedule";
import useLoading from "../hooks/useLoading";

interface ISchedule {
    highlighted: IScheduleDate[]
    schedules: IScheduleDate[]
}

const Schedule: NextPage<ISchedule> = ({highlighted, schedules}) => {
    const {open, toggleMenu} = useMenu()
    const router = useRouter()
    const {handleOpen, handleClose} = useLoading()

    const goTo = async (pathname: string) => {
        await handleOpen()
        await router.push({pathname})
        handleClose()
    }
    return (
        <Website openMenu={open} toggleMenu={toggleMenu}>
            <>
                <div className={styles.header_container}>
                    <Header toggleMenu={toggleMenu}/>
                </div>
                <HeaderPage
                    title={"Programação"}
                />
                <DividerMobile color={EDividerColors.white}/>

                <Title>Cultos e Exposições</Title>

                <div className={styles.content}>
                    <ScheduleItem/>
                    <ScheduleItem/>
                    <ScheduleItem/>
                </div>

                {!!highlighted.length && (
                    <>
                        <Title>Destaques</Title>
                        <div className={styles.content}>
                            {
                                highlighted.map(item => (
                                    <ScheduleEvent key={item.uuid} schedule={item}
                                                   onClick={() => goTo("/schedule/" + item.uuid)}/>
                                ))
                            }
                        </div>
                    </>
                )}

                {!!schedules.length && (
                    <>
                        <Title>Próximas Agendas</Title>
                        <div className={styles.container}>
                            <div className={styles.grid}>
                                {schedules.map(item => (
                                    <ProgramCard schedule={item} key={item.uuid}
                                                 onClick={() => goTo("/schedule/" + item.uuid)}/>
                                ))}
                            </div>
                            {/*<ThirdButton>*/}
                            {/*    <><FiPlus/> ver mais</>*/}
                            {/*</ThirdButton>*/}
                        </div>
                    </>)}
                <FooterPage
                    options={[
                        {
                            text: "Cultos",
                            icon: <FiPlay/>,
                            action: () => goTo("/events")
                        },
                        {
                            text: "Devocionais",
                            icon: <FiBookOpen/>,
                            action: () => goTo("/devotionals")
                        }
                    ]}
                />
            </>
        </Website>
    )
}

export async function getServerSideProps() {
    const api = new Api()
    const highlighted = await api.getSchedulesHighlighted()
    const schedules = await api.getSchedules()
    return {props: {highlighted, schedules}}
}


export default Schedule
