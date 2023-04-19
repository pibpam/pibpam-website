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
import {FiPlus} from "react-icons/fi";
import ThirdButton from "../components/Button/Third";
import React from "react";

const Schedule: NextPage = () => {
    const {open, toggleMenu} = useMenu()

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

                <Title>Eventos</Title>

                <div className={styles.content}>
                    <ScheduleEvent/>
                    <ScheduleEvent/>
                </div>
                <Title>Nesta semana</Title>
                <div className={styles.container}>
                    <div className={styles.grid}>
                        <ProgramCard/>
                        <ProgramCard/>
                        <ProgramCard/>
                        <ProgramCard/>
                        <ProgramCard/>
                        <ProgramCard/>
                        <ProgramCard/>
                        <ProgramCard/>
                    </div>
                    <ThirdButton>
                        <><FiPlus/> ver mais</>
                    </ThirdButton>
                </div>
                <FooterPage/>
            </>
        </Website>
    )
}

export default Schedule
