import type { NextPage } from 'next'
import React from "react";
import { Container } from '@/components/ui/Container'
import Website from '../layout/container/Website'
import AppHeader from "../components/AppHeader";
import AppMinistryCard from "../components/AppMinistryCard";
import EmptyState from "../components/EmptyState";
import { Api } from "../services/api";
import { ITeam } from "../interfaces/Team";
import { useAppNavigation } from "../hooks/useAppNavigation";

interface IMinistries {
    data: ITeam[]
}

const Ministries: NextPage<IMinistries> = ({ data }) => {
    const { goTo } = useAppNavigation()

    return (
        <Website title={"Ministérios"} hasTabNavigator={false}>
            <>
                <AppHeader title="Ministérios" />
                <Container className="pt-6 pb-16">
                    {data.length ? (
                        <ul className="grid gap-4 lg:grid-cols-2">
                            {data.map(item => (
                                <li key={item.uuid}>
                                    <AppMinistryCard
                                        data={item}
                                        onClick={() => goTo({ pathname: "/ministry/" + item.uuid, showLoading: true })}
                                    />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <EmptyState />
                    )}
                </Container>
            </>
        </Website>
    )
}

export async function getStaticProps() {
    const api = new Api()
    const data = await api.getMinistries()
    return { props: { data } }
}


export default Ministries
