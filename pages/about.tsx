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
import {FiGlobe, FiInstagram, FiMail, FiMapPin, FiPhone, FiPlus, FiYoutube} from "react-icons/fi";
import ThirdButton from "../components/Button/Third";

const About: NextPage = () => {
    const {open, toggleMenu} = useMenu()

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
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat urna a pellentesque
                        congue. Aenean lorem nibh, consequat a hendrerit ut, accumsan id turpis. Etiam a tempor neque, a
                        tincidunt libero. Integer ac purus blandit, accumsan sem et, gravida tortor. Integer vel magna
                        urna. Aenean fermentum, velit ut mollis porta, risus orci tempor libero, non vehicula arcu leo
                        eu leo. Proin libero diam, bibendum ut augue sed, elementum lobortis turpis. Proin cursus dolor
                        dolor, sed posuere tortor tempor nec. Proin ornare tincidunt vulputate. Aliquam congue sem eget
                        cursus molestie. Donec suscipit velit tortor. Phasellus vel
                    </p>
                    <div>
                        <ThirdButton>
                            <><FiPlus/> ver mais</>
                        </ThirdButton>
                    </div>
                </div>

                <Title>Pastor</Title>

                <div className={styles.description}>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat urna a pellentesque
                        congue. Aenean lorem nibh, consequat a hendrerit ut, accumsan id turpis. Etiam a tempor neque, a
                        tincidunt libero. Integer ac purus blandit, accumsan sem et, gravida tortor. Integer vel magna
                        urna. Aenean fermentum, velit ut mollis porta, risus orci tempor libero, non vehicula arcu leo
                        eu leo. Proin libero diam, bibendum ut augue sed, elementum lobortis turpis. Proin cursus dolor
                        dolor, sed posuere tortor tempor nec. Proin ornare tincidunt vulputate. Aliquam congue sem eget
                        cursus molestie. Donec suscipit velit tortor. Phasellus vel
                    </p>
                    <div>
                        <ThirdButton>
                            <><FiPlus/> ver mais</>
                        </ThirdButton>
                    </div>
                </div>

                <Title>Contatos</Title>
                <div className={styles.social_media}>
                    <button className={styles.button_link}>
                        <FiMail/> contato@pibpam.org
                    </button>
                    <button className={styles.button_link}>
                        <FiPhone/> 37 3232-3232 // 37 9 9999-9999
                    </button>
                    <button className={styles.button_link}>
                        <FiGlobe/> pibpam.org
                    </button>
                    <button className={styles.button_link_location}>
                        <FiMapPin/>
                        <div>
                            <div>
                                <span>Localização</span><a href="">Como chegar</a>
                            </div>
                            <div>
                                Av. Presidente Vargas, 1641 - Senador Valadares / Pará de Minas - MG
                            </div>
                        </div>
                    </button>
                </div>

                <Title>Redes sociais</Title>
                <div className={styles.social_media}>
                    <button className={styles.button_link}>
                        <FiYoutube/> PIBPAM
                    </button>
                    <button className={styles.button_link}>
                        <FiInstagram/> pibpam
                    </button>
                </div>

                <Title>Horários</Title>
                <div className={styles.schedule}>
                    <ScheduleItem/>
                    <ScheduleItem/>
                    <ScheduleItem/>
                </div>
                <FooterPage/>
            </>
        </Website>
    )
}

export default About
