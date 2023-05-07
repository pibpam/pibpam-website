import type {NextPage} from 'next'
import styles from '../../styles/Devotional.module.scss'
import Website from '../../layout/container/Website'
import DividerMobile, {EDividerColors} from "../../components/DividerMobile";
import Header from "../../components/Header";
import useMenu from "../../hooks/useMenu";
import HeaderPage from "../../components/HeaderPage";
import {FiCalendar} from "react-icons/fi";
import React from "react";
import {Api} from "../../services/api";
import {IDevotinal} from "../../interfaces/Devotinal";
import {DateUtils} from "../../utils/Date";
import {useAppNavigation} from "../../hooks/useAppNavigation";

interface IDevotionalPage {
    data: IDevotinal
}

const Devotional: NextPage<IDevotionalPage> = ({data}) => {
    const {open, toggleMenu} = useMenu()
    const {goTo: goToHook} = useAppNavigation()

    const goBack = async () => {
        await goToHook({pathname: "/devotionals", showLoading: true})
    }

    return (
        <Website hasTabNavigator={false} openMenu={open} toggleMenu={toggleMenu}>
            <>
                <div className={styles.header_container}>
                    <Header goBack={goBack} toggleMenu={toggleMenu}/>
                </div>
                <HeaderPage background={data.image}/>
                <DividerMobile color={EDividerColors.white}/>
                <div className={styles.container}>
                    <h1>{data.title}</h1>
                    <div className={styles.header}>
                        <div>
                            {data.author && (
                                <>
                                    {data.author.image && (<div
                                        style={{background: "url('" + data.author.image + "') center/cover"}}></div>)}
                                    {data.author?.name}
                                </>
                            )}
                        </div>
                        <div><FiCalendar/>{DateUtils.formatDateDefault(data.contentDate)}</div>
                    </div>
                    <p>{data.content}</p>
                </div>
            </>
        </Website>
    )
}

interface IParams {
    params: {
        id: string
    }
}

export async function getServerSideProps({params}: IParams) {
    const api = new Api()
    const data = await api.getDevotional(params.id)
    return {props: {data}}
}

export default Devotional
