import type { NextPage } from "next";
import { Description, PageContent } from "../styles/About";
import Website from "../layout/container/Website";
import DividerMobile, { EDividerColors } from "../components/DividerMobile";
import Header from "../components/Header";
import useMenu from "../hooks/useMenu";
import HeaderPage from "../components/HeaderPage";
import Title from "../components/Title";
import FooterPage from "../components/FooterPage";
import Contacts from "../container/About/Contacts";
import SocialMedia from "../container/About/SocialMedia";
import ChurchSchedule from "../container/About/ChurchSchedule";
import {
  FiCalendar,
  FiPlay,
} from "react-icons/fi";
import { Api } from "../services/api";
import { IChurchInfo } from "../interfaces/Church";
import React, { useEffect, useState } from "react";
import { useAppNavigation } from "../hooks/useAppNavigation";
import { TextCollapse } from "../components/TextCollapse";
import HeaderContainer from "../components/HeaderContainer";
import useHeader from "../hooks/useHeader";
import useOpenMap from "../hooks/useOpenMap";

import usePostMessage from "../hooks/usePostMessage";

interface IAbout {
  data: IChurchInfo;
}

const About: NextPage<IAbout> = ({ data }) => {
  const { open, toggleMenu } = useMenu();
  const { goTo: goToHook, goBack } = useAppNavigation();
  const { scrollActive, changeScroll } = useHeader();
  const { getHref } = useOpenMap();
  const { openLink } = usePostMessage();
  const [mapUrl, setMapUrl] = useState("");

  const goTo = async (pathname: string) => {
    await goToHook({ pathname, showLoading: true });
  };

  useEffect(() => {
    setMapUrl(data.address ? getHref(data.address) : "");
  }, [data.address, getHref]);

  return (
    <Website
      title={"Sobre a PIPPAM"}
      hasTabNavigator={false}
      changeScroll={changeScroll}
      openMenu={open}
      toggleMenu={toggleMenu}
    >
      <>
        <HeaderContainer active={scrollActive}>
          <Header goBack={() => goBack({})} toggleMenu={toggleMenu} />
        </HeaderContainer>

        <HeaderPage title={"Sobre a PIBPAM"} />
        <DividerMobile color={EDividerColors.white} />
        <PageContent>
          <Title>História</Title>

          <Description>
            <TextCollapse text={data.history || ""} />
          </Description>

          <Title>Contatos</Title>
          <Contacts data={data} mapUrl={mapUrl} openLink={openLink} />

          <Title>Redes sociais</Title>
          <SocialMedia data={data} openLink={openLink} />

          {data?.church_schedules && !!data.church_schedules.length && (
            <>
              <Title>Horários</Title>
              <ChurchSchedule
                schedules={data.church_schedules}
                onSeeAll={() => goTo("/schedule")}
              />
            </>
          )}
        </PageContent>

        <FooterPage
          options={[
            {
              text: "Cultos",
              icon: <FiPlay />,
              action: () => goTo("/events"),
            },
            {
              text: "Agenda",
              icon: <FiCalendar />,
              action: () => goTo("/schedule"),
            },
          ]}
        />
      </>
    </Website>
  );
};

export async function getStaticProps() {
  const api = new Api();
  const data = await api.getChurchInfo();
  return { props: { data } };
}

export default About;
