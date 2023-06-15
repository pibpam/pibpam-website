import type {NextPage} from 'next'
import Website from '../../layout/container/Website'
import DividerMobile, {EDividerColors} from "../../components/DividerMobile";
import Header from "../../components/Header";
import useMenu from "../../hooks/useMenu";
import HeaderPage from "../../components/HeaderPage";
import {Api} from "../../services/api";
import {useAppNavigation} from "../../hooks/useAppNavigation";
import useHeader from "../../hooks/useHeader";
import HeaderContainer from "../../components/HeaderContainer";
import {ISeries} from "../../interfaces/Series";
import {FiPlay} from "react-icons/fi";
import styles from "../../styles/SeriesPage.module.scss"
import EventCard from "../../components/EventCard";

interface IEventPage {
    data: ISeries
}

interface IParams {
    params: {
        id: string
    }
}

const Event: NextPage<IEventPage> = ({data}) => {
    const {open, toggleMenu} = useMenu()
    const {goBack} = useAppNavigation()
    const {scrollActive, changeScroll} = useHeader()
    const {goTo} = useAppNavigation()

    const goToContent = async (pathname: string) => {
        await goTo({pathname, showLoading: true})
    }

    return (
        <Website changeScroll={changeScroll} hasTabNavigator={false} openMenu={open} toggleMenu={toggleMenu}>
            <>
                <HeaderContainer active={scrollActive} >
                    <Header goBack={() => goBack({})} toggleMenu={toggleMenu}/>
                </HeaderContainer>
                <HeaderPage background={data.image}/>
                <DividerMobile color={EDividerColors.white}/>
                <div className={styles.container} >
                    <div className={styles.header}>
                        <h2>{data.title}</h2>
                        <p>{data.description}</p>
                        <p> <FiPlay/> {data.series_contents.length} episódios</p>
                    </div>
                    <div className={styles.grid} >
                        {data.series_contents.map(item => (<EventCard key={item.content.uuid} onClick={() => goToContent("/event/" + item.content.uuid)} data={item.content} />))}
                    </div>
                </div>
            </>
        </Website>
    )
}

export async function getServerSideProps({params}: IParams) {
    const api = new Api()
    const data = await api.getOneSeries(params.id)
    if (!data) {
        return {
            notFound: true,
        };
    }
    return {props: {data}}
}

export default Event
