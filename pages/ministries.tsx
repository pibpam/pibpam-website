import type {NextPage} from 'next'
import styles from '../styles/Events.module.scss'
import Website from '../layout/container/Website'
import DividerMobile, {EDividerColors} from "../components/DividerMobile";
import Header from "../components/Header";
import useMenu from "../hooks/useMenu";
import HeaderPage from "../components/HeaderPage";
import MinistriesItem from "../components/MinistriesItem";
import FooterPage from "../components/FooterPage";
import {useRouter} from "next/router";
import {Api} from "../services/api";
import {ITeam} from "../interfaces/Team";
import useLoading from "../hooks/useLoading";
import {FiCalendar, FiPlay} from "react-icons/fi";
import React from "react";

interface IMinistries {
    data: ITeam[]
}

const Ministries: NextPage<IMinistries> = ({data}) => {
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
                    title={"Ministérios"}
                />

                <DividerMobile color={EDividerColors.white}/>

                <div className={styles.container}>
                    <div className={styles.grid}>
                        {data.map(item => (
                            <MinistriesItem data={item} key={item.uuid} onClick={() => goTo("/ministry/" + item.uuid)}/>
                        ))}
                    </div>
                </div>
                <FooterPage
                    options={[
                        {
                            text: "Cultos",
                            icon: <FiPlay/>,
                            action: () => goTo("/events")
                        },
                        {
                            text: "Programação",
                            icon: <FiCalendar/>,
                            action: () => goTo("/schedule")
                        }
                    ]}
                />
            </>
        </Website>
    )
}

export async function getServerSideProps() {
    const api = new Api()
    const data = await api.getMinistries()
    return {props: {data}}
}


export default Ministries
