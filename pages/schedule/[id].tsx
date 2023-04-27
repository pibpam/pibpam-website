import type {NextPage} from 'next'
import styles from '../../styles/SchedulePage.module.scss'
import Website from '../../layout/container/Website'
import DividerMobile, {EDividerColors} from "../../components/DividerMobile";
import Header from "../../components/Header";
import useMenu from "../../hooks/useMenu";
import HeaderPage from "../../components/HeaderPage";
import {useRouter} from "next/router";
import React from "react";
import {FiAlertOctagon, FiCalendar, FiClock, FiEdit3, FiInfo, FiMapPin, FiUsers} from "react-icons/fi";
import ThirdButton from "../../components/Button/Third";
import Title from "../../components/Title";
import MinistriesItem from "../../components/MinistriesItem";

const Schedule: NextPage = () => {
    const {open, toggleMenu} = useMenu()
    const router = useRouter()

    const goBack = async () => {
        await router.push({pathname: "/schedule"})
    }

    return (
        <Website openMenu={open} toggleMenu={toggleMenu}>
            <>
                <div className={styles.header_container}>
                    <Header goBack={goBack} toggleMenu={toggleMenu}/>
                </div>
                <HeaderPage/>
                <DividerMobile color={EDividerColors.white}/>
                <div className={styles.begin}>
                    <h1>ENJUBAP</h1>
                    <h2>Encontro da Juventude Batista de Pará de Minas</h2>
                    <div className={styles.date_time}>
                        <div><FiCalendar/>14 mai, 2023</div>
                        <div><FiClock/>19h30</div>
                    </div>
                    <div className={styles.location}>
                        <FiMapPin/>
                        <div>
                            <div>Av. Presidente Vargas, 1641 - Providência / Pará de Minas MG</div>
                            <a href="">Como chegar</a>
                        </div>
                    </div>
                    <div className={styles.audience}>
                        <FiUsers/>
                        <div>
                            <div>Público:</div>
                            <div>Jovens e Adolescentes</div>
                        </div>
                    </div>

                    <div className={styles.alert}>
                        <FiAlertOctagon/> Vagas limitadas.
                    </div>

                    <div className={styles.subscription_button}>
                        <ThirdButton>
                            <><FiEdit3/>inscrição</>
                        </ThirdButton>
                    </div>
                </div>
                <Title>Descrição</Title>
                <div className={styles.description}>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lectus tellus, egestas id metus
                        eu, fringilla vestibulum est. Mauris ut porta massa. Nam porttitor commodo ipsum in ullamcorper.
                        Morbi metus enim, venenatis at laoreet a, convallis a velit. Integer libero mi, varius eu diam
                        et, cursus malesuada libero. Donec fermentum tellus vel auctor iaculis. Quisque vitae convallis
                        elit, vel scelerisque nulla. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec
                        malesuada suscipit porta. Nullam ex eros, congue non velit nec, blandit laoreet tortor.
                    </p>
                    <div className={styles.alert_multiline} >
                        <FiInfo/>
                        <div>
                            <div>Mais informações:</div>
                            <div>(37) 9 9831-8350 // Marco Oliveira</div>
                        </div>
                    </div>
                </div>

                <Title>Organizador</Title>
                <div className={styles.container}>
                    {/*<MinistriesItem onClick={() => alert("Do")}/>*/}
                </div>
            </>
        </Website>
    )
}

export default Schedule
