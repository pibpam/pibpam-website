import type {NextPage} from 'next'
import styles from '../styles/Events.module.scss'
import Website from '../layout/container/Website'
import DividerMobile, {EDividerColors} from "../components/DividerMobile";
import Header from "../components/Header";
import useMenu from "../hooks/useMenu";
import HeaderPage from "../components/HeaderPage";
import React, {useState} from "react";
import SecondaryButton from "../components/Button/Secondary";
import {FiBookOpen, FiCalendar, FiPlay, FiPlus} from "react-icons/fi";
import EventCard from "../components/EventCard";
import ThirdButton from "../components/Button/Third";
import FooterPage from "../components/FooterPage";
import {Api} from "../services/api";
import {IContent, IGetAllContentsResponse} from "../interfaces/Contens";
import EmptyState from "../components/EmptyState";
import {ApiLocal} from "../services/apiLocal";
import {IPaginationData} from "../interfaces/Pagination";
import {ImSpinner2} from "react-icons/im";
import {useAppNavigation} from "../hooks/useAppNavigation";
import useHeader from "../hooks/useHeader";
import HeaderContainer from "../components/HeaderContainer";

interface IEventsPage {
    data: IGetAllContentsResponse
    lives: IContent[]
}

const Events: NextPage<IEventsPage> = ({data, lives}) => {
    const {open, toggleMenu} = useMenu()
    const [paginator, setPaginator] = useState<IPaginationData>(data.pagination)
    const [contents, setContents] = useState<IContent[]>([] as IContent[])
    const [loading, setLoading] = useState(false)
    const {goTo: goToHook} = useAppNavigation()
    const {scrollActive, changeScroll} = useHeader()

    const goTo = async (pathname: string) => {
        await goToHook({pathname, showLoading: true})
    }

    const handleGetAll = async () => {
        setLoading(true)
        const apiLocal = new ApiLocal()
        const response = await apiLocal.getContents(paginator.page + 1, 20)
        setPaginator(response.pagination)
        setContents(state => ([...state, ...response.data]))
        setLoading(false)
    }

    return (
        <Website changeScroll={changeScroll} openMenu={open} toggleMenu={toggleMenu}>
            <>
                <HeaderContainer active={scrollActive}>
                    <Header toggleMenu={toggleMenu}/>
                </HeaderContainer>
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
                        {
                            contents.map(item => (
                                <EventCard data={item} key={item.uuid} onClick={() => goTo("/event/" + item.uuid)}/>
                            ))
                        }

                        {!data.data.length && (
                            <EmptyState/>
                        )}
                    </div>
                    {paginator.page < paginator.totalPage && (
                        <div className={styles.load_more}>
                            <ThirdButton loading={loading} onClick={handleGetAll}>
                                {loading ? <ImSpinner2/> : (<><FiPlus/> ver mais</>)}
                            </ThirdButton>
                        </div>
                    )}
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
    const data = await api.getContents(1, "transmission", 20)
    const lives = await api.getLives()

    return {props: {data, lives}}
}


export default Events
