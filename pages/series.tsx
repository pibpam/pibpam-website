import type {NextPage} from 'next'
import styles from '../styles/Events.module.scss'
import Website from '../layout/container/Website'
import DividerMobile, {EDividerColors} from "../components/DividerMobile";
import Header from "../components/Header";
import useMenu from "../hooks/useMenu";
import HeaderPage from "../components/HeaderPage";
import React, {useState} from "react";
import {FiBookOpen, FiCalendar, FiPlus} from "react-icons/fi";
import ThirdButton from "../components/Button/Third";
import FooterPage from "../components/FooterPage";
import {Api} from "../services/api";
import EmptyState from "../components/EmptyState";
import {ApiLocal} from "../services/apiLocal";
import {IPaginationData} from "../interfaces/Pagination";
import {ImSpinner2} from "react-icons/im";
import {useAppNavigation} from "../hooks/useAppNavigation";
import useHeader from "../hooks/useHeader";
import HeaderContainer from "../components/HeaderContainer";
import {IGetAllSeries, ISeries} from "../interfaces/Series";
import SeriesCard from "../components/SeriesCard";

interface ISeriesPage {
    data: IGetAllSeries
}

const Series: NextPage<ISeriesPage> = ({data}) => {
    const {open, toggleMenu} = useMenu()
    const [paginator, setPaginator] = useState<IPaginationData>(data.pagination)
    const [contents, setContents] = useState<ISeries[]>([] as ISeries[])
    const [loading, setLoading] = useState(false)
    const {goTo: goToHook, goBack} = useAppNavigation()
    const {scrollActive, changeScroll} = useHeader()

    const goTo = async (pathname: string) => {
        await goToHook({pathname, showLoading: true})
    }

    const handleGetAll = async () => {
        setLoading(true)
        const apiLocal = new ApiLocal()
        const response = await apiLocal.getSeries(paginator.page + 1, 20)
        setPaginator(response.pagination)
        setContents(state => ([...state, ...response.data]))
        setLoading(false)
    }

    return (
        <Website changeScroll={changeScroll} openMenu={open} toggleMenu={toggleMenu}>
            <>
                <HeaderContainer active={scrollActive}>
                    <Header goBack={() => goBack({})} toggleMenu={toggleMenu}/>
                </HeaderContainer>
                {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
                <HeaderPage title={<>Séries</>}/>
                <DividerMobile color={EDividerColors.white}/>
                <div className={styles.container}>
                    <div className={styles.grid}>
                        {
                            contents.map(item => (
                                <SeriesCard data={item} key={item.uuid} onClick={() => goTo("/series/" + item.uuid)}/>
                            ))
                        }
                        {
                            data.data.map(item => (
                                <SeriesCard data={item} key={item.uuid} onClick={() => goTo("/series/" + item.uuid)}/>
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

export async function getStaticProps() {
    const api = new Api()
    const data = await api.getSeries(1, 20)

    return {props: {data}}
}


export default Series
