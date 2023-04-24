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

interface IDevotionalsPage {
    data: Record<string, string>
}

const Devotionals: NextPage<IDevotionalsPage> = ({data}) => {
    const {open, toggleMenu} = useMenu()
    const router = useRouter()

    console.log(data)

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

// This gets called on every request
export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch(`http://ec2-52-207-255-226.compute-1.amazonaws.com/devotionals`)
    const data = await res.json()

    // Pass data to the page via props
    return { props: { data } }
}

export default Devotionals
