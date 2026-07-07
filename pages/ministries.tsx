import type {NextPage} from 'next'
import { Container, Grid } from '../styles/Events'
import Website from '../layout/container/Website'
import DividerMobile, {EDividerColors} from "../components/DividerMobile";
import Header from "../components/Header";
import useMenu from "../hooks/useMenu";
import HeaderPage from "../components/HeaderPage";
import MinistriesItem from "../components/MinistriesItem";
import {Api} from "../services/api";
import {ITeam} from "../interfaces/Team";
import React from "react";
import {useAppNavigation} from "../hooks/useAppNavigation";
import useHeader from "../hooks/useHeader";
import HeaderContainer from "../components/HeaderContainer";

interface IMinistries {
    data: ITeam[]
}

const Ministries: NextPage<IMinistries> = ({data}) => {
    const {open, toggleMenu} = useMenu()
    const {goTo: goToHook, goBack} = useAppNavigation()
    const {scrollActive, changeScroll} = useHeader()

    const goTo = async (pathname: string) => {
        await goToHook({pathname, showLoading: true})
    }

    return (
        <Website title={"Ministérios"} changeScroll={changeScroll} hasTabNavigator={false} openMenu={open}
                 toggleMenu={toggleMenu}>
            <>
                <HeaderContainer active={scrollActive}>
                    <Header goBack={() => goBack({})} toggleMenu={toggleMenu}/>
                </HeaderContainer>
                <HeaderPage
                    title={"Ministérios"}
                />

                <DividerMobile color={EDividerColors.white}/>

                <Container>
                    <Grid>
                        {data.map(item => (
                            <MinistriesItem data={item} key={item.uuid} onClick={() => goTo("/ministry/" + item.uuid)}/>
                        ))}
                    </Grid>
                </Container>
                {/*<FooterPage*/}
                {/*    options={[*/}
                {/*        {*/}
                {/*            text: "Cultos",*/}
                {/*            icon: <FiPlay/>,*/}
                {/*            action: () => goTo("/events")*/}
                {/*        },*/}
                {/*        {*/}
                {/*            text: "Programação",*/}
                {/*            icon: <FiCalendar/>,*/}
                {/*            action: () => goTo("/schedule")*/}
                {/*        }*/}
                {/*    ]}*/}
                {/*/>*/}
            </>
        </Website>
    )
}

export async function getStaticProps() {
    const api = new Api()
    const data = await api.getMinistries()
    return {props: {data}}
}


export default Ministries
