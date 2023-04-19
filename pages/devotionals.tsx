import type {NextPage} from 'next'
import styles from '../styles/Events.module.scss'
import Website from '../layout/container/Website'
import DividerMobile, {EDividerColors} from "../components/DividerMobile";
import Header from "../components/Header";
import useMenu from "../hooks/useMenu";
import HeaderPage from "../components/HeaderPage";
import DevotionalCard from "../components/DevotionalCard";
import ThirdButton from "../components/Button/Third";
import {FiPlus} from "react-icons/fi";
import React from "react";
import FooterPage from "../components/FooterPage";
import {useRouter} from "next/router";

const Devotionals: NextPage = () => {
    const {open, toggleMenu} = useMenu()
    const router = useRouter()

    const goTo =  async (pathname: string) => {
        await router.push({pathname})
    }

    return (
        <Website openMenu={open} toggleMenu={toggleMenu} >
            <>
                <div className={styles.header_container}  >
                    <Header toggleMenu={toggleMenu} />
                </div>
                <HeaderPage
                    title={"Devocionais"}
                />
                <DividerMobile color={EDividerColors.white} />
                <div className={styles.container} >
                    <div className={styles.grid}>
                        <DevotionalCard onClick={() => goTo("/devotional/123")}/>
                        <DevotionalCard onClick={() => goTo("/devotional/123")}/>
                        <DevotionalCard onClick={() => goTo("/devotional/123")}/>
                        <DevotionalCard onClick={() => goTo("/devotional/123")}/>
                        <DevotionalCard onClick={() => goTo("/devotional/123")}/>
                        <DevotionalCard onClick={() => goTo("/devotional/123")}/>
                        <DevotionalCard onClick={() => goTo("/devotional/123")}/>
                        <DevotionalCard onClick={() => goTo("/devotional/123")}/>
                        <DevotionalCard onClick={() => goTo("/devotional/123")}/>
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

export default Devotionals
