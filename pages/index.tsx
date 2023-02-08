import type { NextPage } from 'next'
import styles from '../styles/Home.module.scss'
import { FiChevronLeft, FiChevronRight, FiHome, FiUser, FiVideo, FiPlayCircle, FiPlay, FiCalendar, FiArrowLeft, FiArrowRight, FiFilm } from 'react-icons/fi'
import Carousel from '../components/Carousel'
import ProgramCard from '../components/ProgramCard'
import SeriesCard from '../components/SeriesCard'
import YTPlayer from '../components/YTPlayer'
import PlayerModal from '../components/PlayerModal'
import Divider, { EDividerColors } from '../components/Divider'
import { useState } from 'react'
import PrimaryButton from '../components/Button/Primary'
import Website from '../layout/container/Website'

const Home: NextPage = () => {
  const [modalVideo, setModalVideo] = useState<string | null>(null)

  return (
    <Website>
      <>
        {modalVideo && (
          <PlayerModal
            videoId='TG-0kaq7GmQ'
            thumb='ASDFSF'
            title='Vídeo institucional: PIPAM 41 anos.'
            onClose={() => setModalVideo(null)}
          />
        )}
        <div className={styles.banner} >
          <button className={`${styles.banner_arrow} ${styles.banner_arrow__left}`} >
            <FiChevronLeft />
          </button>
          <div className={styles.backdrop} >
            <div className={styles.banner_content} >
              <h1>Jesus Cristo Vive!</h1>
              <p>
                "Por que vocês estão procurando entre os mortos aquele que vive?<br />
                Ele não está aqui! Ressuscitou!"</p>
              <p>Lucas 24, 5-6</p>
            </div>
          </div>
          <button className={`${styles.banner_arrow} ${styles.banner_arrow__rigth}`} >
            <FiChevronRight />
          </button>
        </div>

        <Divider />

        <div className={styles.introduction} >
          <div>
            <div>
              <div>
                <h2>
                  <strong> Bem-Vindo(a) á PIB <br /> Pará de Minas </strong> <br />
                  Um lugar para você e <br /> para sua família.
                </h2>
              </div>
              <div>
                <PrimaryButton>
                  <><FiHome />Conheça a nossa igreja</>
                </PrimaryButton>
                <PrimaryButton>
                  <><FiUser />Conheça o nosso pastor</>
                </PrimaryButton>
                <PrimaryButton onClick={() => setModalVideo('sadas')} >
                  <><FiPlayCircle />41 Anos de PIBPAM
                  </></PrimaryButton>
              </div>
            </div>
            <div>
              Faça-nos uma visita! <br /> Será um prazer receber você!
            </div>
          </div>
        </div>

        <Divider color={EDividerColors.white} />

        <div className={styles.lastTransmission} >
          <div>
            <div>
              <FiVideo />
              <h3>Assista a nossa<br />
                última transmissão</h3>

              <p>
                Celebração da Santa Ceia do Senhor
              </p>

              <p>
                Pr. Alex Oliveira
              </p>
            </div>
            <div>
              <YTPlayer autoplay videoId='TG-0kaq7GmQ' thumb='dsffgsdf' />
            </div>
          </div>
        </div>
        <div className={styles.watchnow} >
          <div>
            <button> <FiPlay /> Assistir Culto On-line</button>
          </div>
        </div>
        <div className={styles.programation} >
          <div>
            <div>
              <FiCalendar />
              <h3> Nossa Programação<br /> da Semana</h3>
              <p> Selecione o evento para mais detalhes.</p>
              <div>
                <button><FiArrowLeft /></button>
                <button><FiArrowRight /></button>
              </div>
            </div>
            <div>
              <Carousel>
                <>
                  <ProgramCard />
                  <ProgramCard />
                  <ProgramCard />
                  <ProgramCard />
                  <ProgramCard />
                </>
              </Carousel>
            </div>
          </div>
        </div>

        <Divider color={EDividerColors.yellow} />

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
