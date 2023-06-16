import type {NextPage} from 'next'
import styles from '../../styles/Ministry.module.scss'
import Website from '../../layout/container/Website'
import DividerMobile, {EDividerColors} from "../../components/DividerMobile";
import Header from "../../components/Header";
import useMenu from "../../hooks/useMenu";
import HeaderPage from "../../components/HeaderPage";
import React from "react";
import Title from "../../components/Title";
import {Api} from "../../services/api";
import {ITeam} from "../../interfaces/Team";
import {useAppNavigation} from "../../hooks/useAppNavigation";
import useHeader from "../../hooks/useHeader";
import HeaderContainer from "../../components/HeaderContainer";

interface IParams {
    params: {
        id: string
    }
}

interface IMinistry {
    data: ITeam
}

const Ministry: NextPage<IMinistry> = ({data}) => {
    const {open, toggleMenu} = useMenu()
    const {goBack} = useAppNavigation()
    const {scrollActive, changeScroll} = useHeader()

    return (
        <Website changeScroll={changeScroll} hasTabNavigator={false} openMenu={open} toggleMenu={toggleMenu}>
            <>
                <HeaderContainer active={scrollActive} >
                    <Header goBack={() => goBack({})} toggleMenu={toggleMenu}/>
                </HeaderContainer>
                <HeaderPage background={data.image}/>
                <DividerMobile color={EDividerColors.white}/>
                <div className={styles.container}>
                    <h1>{data.name}</h1>
                    <h2>{data.shortDescription}</h2>
                    <p>{data.description}</p>
                </div>
                {!!data.teamMember.length && (
                    <>
                        <Title>Equipe</Title>
                        <div className={styles.team}>
                            {data.teamMember.map(item => (
                                <div key={item.uuid} className={styles.team_item}>
                                    <div style={{background: "url('" + (item.member?.image || "/user.jpg") + "') center/cover"}}></div>
                                    <div>{item.member?.name}</div>
                                    <div>{item.role}</div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </>
        </Website>
    )
}

export async function getServerSideProps({params}: IParams) {
    const api = new Api()
    const data = await api.getMinistry(params.id)
    if (!data) {
        return {
            notFound: true,
        };
    }
    return {props: {data}}
}

export default Ministry
