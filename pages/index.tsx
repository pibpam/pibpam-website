import type { NextPage } from 'next'
import styles from '../styles/Home.module.scss'
import { FiChevronLeft, FiChevronRight, FiHome, FiUser, FiVideo, FiPlay, FiCalendar, FiArrowLeft, FiArrowRight, FiFilm } from 'react-icons/fi'
import Carousel from '../components/Carousel'
import ProgramCard from '../components/ProgramCard'
import SeriesCard from '../components/SeriesCard'
import YTPlayer from '../components/YTPlayer'
import Divider, { EDividerColors } from '../components/Divider'
import PrimaryButton from '../components/Button/Primary'
import Website from '../layout/container/Website'
import Banner from "../components/Home/Banner";
import DividerMobile from "../components/DividerMobile";
import Header from "../components/Header";
import Intro from "../components/Home/Intro";
import Transmission from "../components/Home/Transmission";
import Schedule from "../components/Home/Schedule";

const Home: NextPage = () => {

  return (
    <Website>
      <>
        {/*{modalVideo && (*/}
        {/*  <PlayerModal*/}
        {/*    videoId='TG-0kaq7GmQ'*/}
        {/*    thumb='ASDFSF'*/}
        {/*    title='Vídeo institucional: PIPAM 41 anos.'*/}
        {/*    onClose={() => setModalVideo(null)}*/}
        {/*  />*/}
        {/*)}*/}
        {/*<div className={styles.banner} >*/}
        {/*  <button className={`${styles.banner_arrow} ${styles.banner_arrow__left}`} >*/}
        {/*    <FiChevronLeft />*/}
        {/*  </button>*/}
        {/*  <div className={styles.backdrop} >*/}
        {/*    <div className={styles.banner_content} >*/}
        {/*      <h1>Jesus Cristo Vive!</h1>*/}
        {/*      <p>*/}
        {/*        "Por que vocês estão procurando entre os mortos aquele que vive?<br />*/}
        {/*        Ele não está aqui! Ressuscitou!"</p>*/}
        {/*      <p>Lucas 24, 5-6</p>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*  <button className={`${styles.banner_arrow} ${styles.banner_arrow__rigth}`} >*/}
        {/*    <FiChevronRight />*/}
        {/*  </button>*/}
        {/*</div>*/}

        <Header/>
        <Banner/>
        <DividerMobile />
        <Intro/>
        <DividerMobile color={EDividerColors.white} />
        <Transmission/>
        <Schedule/>
        <DividerMobile color={EDividerColors.yellow} />

        <div className={styles.series} >
          <div>
            <div>
              <FiFilm />
              <h3>
                Acompanhe nossas séries<br /> de Ministrações.
              </h3>
              <p>
                Nossas série, são sequências de estudos <br /> de determinados assuntos.
              </p>
            </div>
            <div>
              <Carousel>
                <>
                  <SeriesCard />
                  <SeriesCard />
                  <SeriesCard />
                  <SeriesCard />
                </>
              </Carousel>
            </div>
            <div>
              <button><FiArrowLeft /></button>
              <button><FiArrowRight /></button>
            </div>
          </div>
        </div>
      </>
    </Website >
  )
}

export default Home
