import type {NextPage} from 'next'
import styles from '../styles/Events.module.scss'
import Website from '../layout/container/Website'
import DividerMobile, {EDividerColors} from "../components/DividerMobile";
import Header from "../components/Header";
import useMenu from "../hooks/useMenu";
import HeaderPage from "../components/HeaderPage";
import React from "react";
import SecondaryButton from "../components/Button/Secondary";
import {FiPlay, FiPlus} from "react-icons/fi";
import EventCard from "../components/EventCard";
import ThirdButton from "../components/Button/Third";
import FooterPage from "../components/FooterPage";

const Events: NextPage = () => {
    const {open, toggleMenu} = useMenu()

    return (
        <Website openMenu={open} toggleMenu={toggleMenu}>
            <>
                <div className={styles.header_container}>
                    <Header toggleMenu={toggleMenu}/>
                </div>
                {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
                <HeaderPage title={<>Cultos <span>//</span> Eventos </>}/>
                <DividerMobile color={EDividerColors.white}/>
                <div className={styles.container}>
                    <div className={styles.button__on_line}>
                        <SecondaryButton>
                            <><FiPlay/> Assistir Culto On-line</>
                        </SecondaryButton>
                    </div>

                    <div className={styles.grid}>
                        <EventCard/>
                        <EventCard/>
                        <EventCard/>
                        <EventCard/>
                        <EventCard/>
                        <EventCard/>
                        <EventCard/>
                        <EventCard/>
                        <EventCard/>
                        <EventCard/>
                        <EventCard/>
                        <EventCard/>
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

export default Events
