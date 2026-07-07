import React from "react";

import { PiBookBookmarkThin } from "react-icons/pi";
import { IReadingPlan } from "../../../interfaces/ReadingPlan";
import { useAppNavigation } from "../../../hooks/useAppNavigation";
import { PostMessageContext } from "../../../contexts/postMessage";
import { IMemberBasic } from "../../../interfaces/Member";
import BirthdayWidget from "../BirthdayWidget";
import {
  Backdrop,
  BannerEl,
  Content,
  DailyReading,
  HeaderTitle,
  VideoContainer,
  Widgets,
} from "./styles"

const Banner: React.FC<{ readingPlan?: IReadingPlan; birthdaysMonth?: IMemberBasic[] }> = ({
  readingPlan,
  birthdaysMonth,
}) => {
   const {goTo} = useAppNavigation()
   const {deviceInfo} = React.useContext(PostMessageContext)

  const [todayDay, setTodayDay] = React.useState<number | null>(null);

  React.useEffect(() => {
    setTodayDay(new Date().getDate());
  }, []);

  const birthdaysToday = React.useMemo(() => {
    if (todayDay === null) {
      return [];
    }

    return (birthdaysMonth || []).filter((member) => {
      return typeof member.birthday === "number" && member.birthday === todayDay;
    });
  }, [birthdaysMonth, todayDay]);

  const showWidgets = !!readingPlan || birthdaysToday.length > 0;

  return (
    <BannerEl>
      <VideoContainer>
        <div>
          <video src="https://pibpam.s3.us-east-1.amazonaws.com/settings/background-ano-novo.mp4" autoPlay loop muted></video>
        </div>
      </VideoContainer>
      <Content>
        {showWidgets && (
          <Widgets style={{ marginTop: `${(deviceInfo?.top || 0) + 24}px` }}>
            {!!readingPlan && (
              <DailyReading onClick={() => goTo({
                pathname: `/reading-plan/${readingPlan.uuid}`,
                showLoading: true
              })}>
                <div>
                  <PiBookBookmarkThin />
                </div>
                <div>
                  <h2>Já fez a leitura Bíblica de hoje?</h2>
                  <h3>{readingPlan.title}</h3>
                  <h4>{readingPlan.description}</h4>
                </div>
              </DailyReading>
            )}

            <BirthdayWidget birthdays={birthdaysToday} />
          </Widgets>
        )}

        <HeaderTitle>
          <h1>Bem-vindo à Primeira Igreja Batista em Pará de Minas.</h1>
          <h2>Um lugar para você e sua família!</h2>
        </HeaderTitle>
      </Content>
      <Backdrop />
    </BannerEl>
  );
};

export default Banner
