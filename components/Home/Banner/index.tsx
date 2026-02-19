import React from "react";

import styles from '../../../styles/components/Home/Banner.module.scss'
import YTPlayer from "../../YTPlayer";
import { PiBookBookmarkThin } from "react-icons/pi";
import { IReadingPlan } from "../../../interfaces/ReadingPlan";
import { useAppNavigation } from "../../../hooks/useAppNavigation";

const Banner: React.FC<{ readingPlan?: IReadingPlan }> = ({readingPlan}) => {

   const {goTo} = useAppNavigation()

  return (
    <div className={styles.banner}>
      <div className={styles.videoContainer}>
        <div>
          {/* <YTPlayer
            videoId="H0SiysdHN40"
            autoplay
            controls={0}
            loop
            mute
            start={6}
          /> */}
        </div>
      </div>
      <div className={styles.content}>
        {!!readingPlan && (
          <button onClick={() => goTo({
            pathname: `/reading-plan/${readingPlan.uuid}`,
            showLoading: true
          })} className={styles.dailyReading}>
            <div>
              <PiBookBookmarkThin />
            </div>
            <div>
              <h2>Já fez a leitura Biblíca de hoje?</h2>
              <h3>{readingPlan.title}</h3>
              <h4>{readingPlan.description}</h4>
            </div>
          </button>
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
