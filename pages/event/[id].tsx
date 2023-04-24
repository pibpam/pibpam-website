import type {NextPage} from 'next'
import styles from '../../styles/Events.module.scss'
import Website from '../../layout/container/Website'
import DividerMobile, {EDividerColors} from "../../components/DividerMobile";
import Header from "../../components/Header";
import useMenu from "../../hooks/useMenu";
import HeaderPage from "../../components/HeaderPage";
import LivePage from "../../components/LivePage";
import {useRouter} from "next/router";
import {Api} from "../../services/api";
import {IContent} from "../../interfaces/Contens";

interface IEventPage {
    data: IContent
}

interface IParams {
    params: {
        id: string
    }
}

const Event: NextPage<IEventPage> = ({data}) => {
    const {open, toggleMenu} = useMenu()
    const router = useRouter()

    const goBack = async () => {
        await router.push({pathname: "/events"})
    }

    return (
        <Website hasTabNavigator={false} openMenu={open} toggleMenu={toggleMenu}>
            <>
                <div className={styles.header_container}>
                    <Header goBack={goBack} toggleMenu={toggleMenu}/>
                </div>
                <HeaderPage/>
                <DividerMobile color={EDividerColors.white}/>
                <LivePage content={data} isVod/>
            </>
        </Website>
    )
}

export async function getServerSideProps({params}: IParams) {
    const api = new Api()
    const data = await api.getContent(params.id)
    return {props: {data}}
}

export default Event
