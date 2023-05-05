import type {NextPage} from 'next'
import styles from '../styles/Events.module.scss'
import Website from '../layout/container/Website'
import DividerMobile, {EDividerColors} from "../components/DividerMobile";
import Header from "../components/Header";
import useMenu from "../hooks/useMenu";
import HeaderPage from "../components/HeaderPage";
import React from "react";
import SecondaryButton from "../components/Button/Secondary";
import {FiBookOpen, FiCalendar, FiPlay} from "react-icons/fi";
import EventCard from "../components/EventCard";
import ThirdButton from "../components/Button/Third";
import FooterPage from "../components/FooterPage";
import {useRouter} from "next/router";
import {Api} from "../services/api";
import {IContent, IGetAllContentsResponse} from "../interfaces/Contens";
import useLoading from "../hooks/useLoading";
import EmptyState from "../components/EmptyState";

interface IEventsPage {
    data: IGetAllContentsResponse
    lives: IContent[]
}

const Events: NextPage<IEventsPage> = ({data, lives}) => {
    const {open, toggleMenu} = useMenu()
    const router = useRouter()
    const {handleClose, handleOpen} = useLoading()

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
                {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
                <HeaderPage title={<>Cultos <span>//</span> Eventos </>}/>
                <DividerMobile color={EDividerColors.white}/>
                <div className={styles.container}>
                    {!!lives && !!lives.length && (
                        <div className={styles.button__on_line}>
                            <SecondaryButton onClick={() => goTo("/event/" + lives[0].uuid)}>
                                <><FiPlay/> Assistir Culto On-line</>
                            </SecondaryButton>
                        </div>
                    )}

                    <div className={styles.grid}>
                        {
                            data.data.map(item => (
                                <EventCard data={item} key={item.uuid} onClick={() => goTo("/event/" + item.uuid)}/>
                            ))
                        }

                        {!data.data.length && (
                            <EmptyState/>
                        )}
                    </div>
                    {/*<ThirdButton>*/}
                    {/*    <><FiPlus/> ver mais</>*/}
                    {/*</ThirdButton>*/}
                </div>
                <FooterPage
                    options={[
                        {
                            text: "Devocionais",
                            icon: <FiBookOpen/>,
                            action: () => goTo("/devotionals")
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
    const data = await api.getContents(1, 20)
    const lives = await api.getLives()

    return {props: {data, lives}}
}


export default Events
