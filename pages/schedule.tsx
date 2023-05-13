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
import React from "react";
import {Api} from "../services/api";
import {IScheduleDate} from "../interfaces/Schedule";
import {useAppNavigation} from "../hooks/useAppNavigation";
import {IChurchSchedule} from "../interfaces/Church";
import useHeader from "../hooks/useHeader";
import HeaderContainer from "../components/HeaderContainer";

interface ISchedule {
    highlighted: IScheduleDate[]
    schedules: IScheduleDate[]
    churchSchedules?: IChurchSchedule[]
}

const Schedule: NextPage<ISchedule> = ({highlighted, schedules, churchSchedules}) => {
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
                    title={"Programação"}
                />
                <DividerMobile color={EDividerColors.white}/>

                {churchSchedules && !!churchSchedules.length && (
                    <>
                        <Title>Cultos e Exposições</Title>
                        <div className={styles.content}>
                            {churchSchedules.map(item => <ScheduleItem key={item.uuid} data={item}/>)}
                        </div>
                    </>
                )}

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
    const churchSchedules = await api.getChurchSchedule()
    return {props: {highlighted, schedules, churchSchedules}}
}


export default Schedule
