import type {NextPage} from 'next'
import styles from '../styles/Notices.module.scss'
import Website from '../layout/container/Website'
import DividerMobile, {EDividerColors} from "../components/DividerMobile";
import Header from "../components/Header";
import useMenu from "../hooks/useMenu";
import HeaderPage from "../components/HeaderPage";
import React, {useContext, useEffect} from "react";
import {FiCheck} from "react-icons/fi";
import {useAppNavigation} from "../hooks/useAppNavigation";
import useHeader from "../hooks/useHeader";
import HeaderContainer from "../components/HeaderContainer";
import {NoticesContext} from "../contexts/notices";

const Notices: NextPage = () => {
    const {open, toggleMenu} = useMenu()
    const {goBack} = useAppNavigation()
    const {scrollActive, changeScroll} = useHeader()
    const {allSeen, setAllSeen} = useContext(NoticesContext)

    useEffect(() => {
        setTimeout(() => {
            setAllSeen(true)
        }, 5000)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Website title={"Avisos"} changeScroll={changeScroll} openMenu={open} toggleMenu={toggleMenu}>
            <>
                <HeaderContainer active={scrollActive}>
                    <Header goBack={() => goBack({})} toggleMenu={toggleMenu}/>
                </HeaderContainer>
                {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
                <HeaderPage title={<>Avisos</>}/>
                <DividerMobile color={EDividerColors.white}/>
                <div className={styles.container}>
                    <div className={styles.header}>
                        <div>
                            Sexta-feira, 14 de julho de 2023
                        </div>
                    </div>
                    <div className={`${styles.noticeItem} ${!allSeen && styles.addAnimation}`}>
                        <p>
                            Informamos que o velório do pai de nossa irmã Josiane será realizado amanhã, 15 de julho, no
                            período de 8 às 14 horas no velório municipal. O momento fúnebre está marcado para às 10
                            horas. Contamos com a presença dos irmãos.
                        </p>
                        <span>
                            15:00 <FiCheck/>
                        </span>
                    </div>
                </div>
            </>
        </Website>
    )
}

export default Notices
