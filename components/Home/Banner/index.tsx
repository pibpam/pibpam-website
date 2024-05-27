import React from "react";

import styles from '../../../styles/components/Home/Banner.module.scss'
import YTPlayer from "../../YTPlayer";

const Banner: React.FC = () => {
  return (
    <div className={styles.banner}>
      <div className={styles.videoContainer}>
        <div>
          <YTPlayer videoId="sdjpCpYfy6Y" autoplay controls={0} loop mute />
        </div>
      </div>
      <div className={styles.content} >
        <h1>Bem-vindo à Primeira Igreja Batista em Pará de Minas.</h1>
        <h2>Um lugar para você e sua família!</h2>
      </div>
      <div className={styles.backdrop} />
    </div>
  )
}

export default Banner
