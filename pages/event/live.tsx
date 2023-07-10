import type {NextPage} from 'next'
import Website from '../../layout/container/Website'
import DividerMobile, {EDividerColors} from "../../components/DividerMobile";
import Header from "../../components/Header";
import useMenu from "../../hooks/useMenu";
import HeaderPage from "../../components/HeaderPage";
import LivePage from "../../components/LivePage";
import {useContext} from "react";
import {LivesContext} from "../../contexts/lives";
import useHeader from "../../hooks/useHeader";
import HeaderContainer from "../../components/HeaderContainer";
import {useAppNavigation} from "../../hooks/useAppNavigation";

const Live: NextPage = () => {
    const {open, toggleMenu} = useMenu()
    const {lives} = useContext(LivesContext)
    const {scrollActive, changeScroll} = useHeader()
    const {goBack} = useAppNavigation()

    return (
        <Website title={`Ao vivo - ${lives[0].name || ''}`} changeScroll={changeScroll} openMenu={open}
                 toggleMenu={toggleMenu}>
            <>
                <HeaderContainer active={scrollActive}>
                    <Header goBack={() => goBack({})} toggleMenu={toggleMenu}/>
                </HeaderContainer>
                <HeaderPage/>
                <DividerMobile color={EDividerColors.white}/>
                {!!lives.length &&
                    (<LivePage content={lives[0]}/>)
                }
            </>
        </Website>
    )
}

export default Live
