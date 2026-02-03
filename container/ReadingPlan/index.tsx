import React from "react";
import { IGetAllReadingPlan } from "../../interfaces/ReadingPlan";
import Website from "../../layout/container/Website";
import HeaderContainer from "../../components/HeaderContainer";
import Header from "../../components/Header";
import HeaderPage from "../../components/HeaderPage";
import DividerMobile from "../../components/DividerMobile";
import { EDividerColors } from "../../components/Divider";
import useMenu from "../../hooks/useMenu";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import useHeader from "../../hooks/useHeader";
import { PiBookBookmark, PiEye } from "react-icons/pi";
import { Container, ContentItem } from "./styles";
import Link from "next/link";


const ReadingPlan: React.FC<{ readingPlans: IGetAllReadingPlan }> = ({
  readingPlans,
}) => {
  const { open, toggleMenu } = useMenu();
  const { goBack, goTo } = useAppNavigation();
  const { scrollActive, changeScroll } = useHeader();

  return (
    <Website
      title={"Plano de Leitura"}
      changeScroll={changeScroll}
      openMenu={open}
      toggleMenu={toggleMenu}
      hasTabNavigator={false}
    >
      <>
        <HeaderContainer active={scrollActive}>
          <Header goBack={() => goBack({})} toggleMenu={toggleMenu} />
        </HeaderContainer>
        {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
        <HeaderPage title={<>Leitura Bíblica</>} />
        <DividerMobile color={EDividerColors.white} />
        <Container>
          {readingPlans.data
            .sort((a, b) => (a.title < b.title ? 1 : -1))
            .map((item) => (
              <ContentItem
                key={item.uuid}
                onClick={() =>
                  goTo({
                    pathname: `/reading-plan/${item.uuid}`,
                    showLoading: true,
                  })
                }
              >
                <div>
                  <PiBookBookmark />
                </div>
                <div>
                  <h6>{item.title}</h6>
                  <p>{item.description}</p>
                  <div>
                    {[...Array(item.itemsQtd)].map((key) => (
                      <div key={key} />
                    ))}
                  </div>
                </div>
              </ContentItem>
            ))}
        </Container>
      </>
    </Website>
  );
};

export default ReadingPlan;
