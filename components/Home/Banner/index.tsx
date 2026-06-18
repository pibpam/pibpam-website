import React from "react";

import styles from '../../../styles/components/Home/Banner.module.scss'
import { PiBookBookmarkThin } from "react-icons/pi";
import { IReadingPlan } from "../../../interfaces/ReadingPlan";
import { useAppNavigation } from "../../../hooks/useAppNavigation";
import { PostMessageContext } from "../../../contexts/postMessage";
import { IMemberBasic } from "../../../interfaces/Member";
import BirthdayWidget from "../BirthdayWidget";

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
    <div className={styles.banner}>
      <div className={styles.videoContainer}>
        <div>
          <video src="https://pibpam.s3.us-east-1.amazonaws.com/settings/background-ano-novo.mp4" autoPlay loop muted></video>
        </div>
      </div>
      <div className={styles.content}>
        {showWidgets && (
          <div className={styles.widgets} style={{ marginTop: `${(deviceInfo?.top || 0) + 24}px` }}>
            {!!readingPlan && (
              <button onClick={() => goTo({
                pathname: `/reading-plan/${readingPlan.uuid}`,
                showLoading: true
              })} className={styles.dailyReading}>
                <div>
                  <PiBookBookmarkThin />
                </div>
                <div>
                  <h2>Já fez a leitura Bíblica de hoje?</h2>
                  <h3>{readingPlan.title}</h3>
                  <h4>{readingPlan.description}</h4>
                </div>
              </button>
            )}

            <BirthdayWidget birthdays={birthdaysToday} />
          </div>
        )}

        <div className={styles.headerTitle}>
          <h1>Bem-vindo à Primeira Igreja Batista em Pará de Minas.</h1>
          <h2>Um lugar para você e sua família!</h2>
        </div>
      </div>
      <div className={styles.backdrop} />
    </div>
  );
};

export default Banner
