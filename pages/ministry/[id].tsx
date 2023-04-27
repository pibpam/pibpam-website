import type {NextPage} from 'next'
import styles from '../../styles/Ministry.module.scss'
import Website from '../../layout/container/Website'
import DividerMobile, {EDividerColors} from "../../components/DividerMobile";
import Header from "../../components/Header";
import useMenu from "../../hooks/useMenu";
import HeaderPage from "../../components/HeaderPage";
import {useRouter} from "next/router";
import React from "react";
import Title from "../../components/Title";
import useLoading from "../../hooks/useLoading";
import {Api} from "../../services/api";
import {ITeam} from "../../interfaces/Team";

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
    const router = useRouter()

    const {handleClose, handleOpen} = useLoading()

    const goBack = async () => {
        await handleOpen()
        await router.push({pathname: "/ministries"})
        handleClose()
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
                                    <div style={{background: "url('" + item.member?.image + "') center/cover"}}></div>
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
    return {props: {data}}
}

export default Ministry
