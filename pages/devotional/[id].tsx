import type { NextPage } from 'next'
import { Container, Header } from '../../styles/Devotional'
import Website from '../../layout/container/Website'
import DividerMobile, { EDividerColors } from "../../components/DividerMobile";
import HeaderComp from "../../components/Header";
import useMenu from "../../hooks/useMenu";
import HeaderPage from "../../components/HeaderPage";
import { FiCalendar } from "react-icons/fi";
import React from "react";
import { Api } from "../../services/api";
import { IDevotinal } from "../../interfaces/Devotinal";
import { DateUtils } from "../../utils/Date";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import useHeader from "../../hooks/useHeader";
import HeaderContainer from "../../components/HeaderContainer";
import { GetStaticPaths } from "next";
import ShareButton from "../../components/ShareButton";

interface IDevotionalPage {
  data: IDevotinal
}

const Devotional: NextPage<IDevotionalPage> = ({ data }) => {
  const { open, toggleMenu } = useMenu()
  const { goBack } = useAppNavigation()
  const { scrollActive, changeScroll } = useHeader()

  return (
    <Website changeScroll={changeScroll} title={`Devocional: ${data.title} - ${data.author?.name}`} img={data.image}
      hasTabNavigator={false} openMenu={open} toggleMenu={toggleMenu}>
      <>
        <HeaderContainer active={scrollActive}>
          <HeaderComp goBack={() => goBack({})} toggleMenu={toggleMenu} />
        </HeaderContainer>
        <HeaderPage background={data.image} />
        <DividerMobile color={EDividerColors.white} />
        <Container>
          <h1>{data.title}</h1>
          <Header>
            <div>
              {data.author && (
                <>
                  {data.author.image && (<div
                    style={{ background: "url('" + data.author.image + "') center/cover" }}></div>)}
                  {data.author?.name}
                </>
              )}
            </div>
            <div><FiCalendar />{DateUtils.formatDateDefault(data.contentDate)}</div>
          </Header>
          <div dangerouslySetInnerHTML={{ __html: data.content || "" }}></div>
          <ShareButton url={`https://pibpam.org/devotional/${data.uuid}`}
            message={`Devocional: ${data.title} - ${data.author?.name}`} />
        </Container>
      </>
    </Website>
  )
}

interface IParams {
  params: {
    id: string
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }: IParams) {
  const api = new Api()
  const data = await api.getDevotional(params.id)
  if (!data) {
    return {
      notFound: true,
    };
  }
  return { props: { data } }
}

export default Devotional
