import type { NextPage } from 'next'
import { Container, Team, TeamItem } from '../../styles/Ministry'
import Website from '../../layout/container/Website'
import DividerMobile, { EDividerColors } from "../../components/DividerMobile";
import HeaderComp from "../../components/Header";
import useMenu from "../../hooks/useMenu";
import HeaderPage from "../../components/HeaderPage";
import React from "react";
import Title from "../../components/Title";
import { Api } from "../../services/api";
import { ITeam } from "../../interfaces/Team";
import { useAppNavigation } from "../../hooks/useAppNavigation";
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

const Ministry: NextPage<IMinistry> = ({ data }) => {
  const { open, toggleMenu } = useMenu()
  const { goBack } = useAppNavigation()
  const { scrollActive, changeScroll } = useHeader()

  return (
    <Website title={`${data.name}`} changeScroll={changeScroll} hasTabNavigator={false} openMenu={open}
      toggleMenu={toggleMenu}>
      <>
        <HeaderContainer active={scrollActive}>
          <HeaderComp goBack={() => goBack({})} toggleMenu={toggleMenu} />
        </HeaderContainer>
        <HeaderPage background={data.image} />
        <DividerMobile color={EDividerColors.white} />
        <Container>
          <h1>{data.name}</h1>
          <h2>{data.shortDescription}</h2>
          <p>{data.description}</p>
        </Container>
        {!!data.teamMember.length && (
          <>
            <Title>Equipe</Title>
            <Team>
              {data.teamMember.map(item => (
                <TeamItem key={item.uuid}>
                  <div
                    style={{ background: "url('" + (item.member?.image || "/user.jpg") + "') center/cover" }}></div>
                  <div>{item.member?.name}</div>
                  <div>{item.role}</div>
                </TeamItem>
              ))}
            </Team>
          </>
        )}
      </>
    </Website>
  )
}

export async function getServerSideProps({ params }: IParams) {
  const api = new Api()
  const data = await api.getMinistry(params.id)
  if (!data) {
    return {
      notFound: true,
    };
  }
  return { props: { data } }
}

export default Ministry
