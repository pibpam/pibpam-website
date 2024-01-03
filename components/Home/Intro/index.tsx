import React from "react";
import PrimaryButton from "../../Button/Primary";
import { FiHome, FiUsers } from "react-icons/fi";
import styles from "../../../styles/components/Home/Intro.module.scss"
import CarouselAutoPlay from "../../CarouselAutoPlay";
import { IBanner } from "../../../interfaces/Banner";

interface IIntro {
  goTo: (pathname: string) => void
  banners?: IBanner[]
  userName?: string
}

const Intro: React.FC<IIntro> = ({ goTo, banners, userName }) => {
  return (
    <>
      <div className={styles.container}>
        {!!userName && (
          <button className={styles.memberarea} onClick={() => goTo("/member")}  >
            <FiUsers />
            <div>
              <h3>Olá {userName.split(' ')[0]}!</h3>
              <p>Acesse a área de membros aqui.</p>
            </div>
          </button>
        )}
        <div className={styles.buttons}>
          <PrimaryButton onClick={() => goTo("/about")}>
            <><FiHome />Conheça a nossa igreja</>
          </PrimaryButton>

          {/*<PrimaryButton onClick={() => goTo("/about")}>*/}
          {/*    <><FiUser/>Conheça o nosso pastor</>*/}
          {/*</PrimaryButton>*/}
        </div>
        <p>
          Faça-nos uma visita! Será um prazer receber você!
        </p>
        {banners && !!banners.length && (
          <div className={styles.bannerContainer}>
            <CarouselAutoPlay banners={banners} />
          </div>
        )}
      </div>
    </>
  )
}

export default Intro
