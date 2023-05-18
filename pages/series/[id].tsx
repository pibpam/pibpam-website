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
    const {goTo: goToHook} = useAppNavigation()
    const {scrollActive, changeScroll} = useHeader()

    const goBack = async () => {
        await goToHook({pathname: "/series", showLoading: true})
    }

    return (
        <Website changeScroll={changeScroll} hasTabNavigator={false} openMenu={open} toggleMenu={toggleMenu}>
            <>
                <HeaderContainer active={scrollActive} >
                    <Header goBack={goBack} toggleMenu={toggleMenu}/>
                </HeaderContainer>
                <HeaderPage background={data.image}/>
                <DividerMobile color={EDividerColors.white}/>
                <div>
                    <h2>{data.title}</h2>
                    <p>{data.description}</p>
                    <p> <FiPlay/> {data.series_contents.length} episódios</p>
                    <p>Em construção</p>
                </div>
            </>
        </Website>
    )
}

export async function getServerSideProps({params}: IParams) {
    const api = new Api()
    const data = await api.getOneSeries(params.id)
    return {props: {data}}
}

export default Event
