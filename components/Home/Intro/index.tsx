import React from "react";
import PrimaryButton from "../../Button/Primary";
import { FiArrowRight, FiHome, FiUsers } from "react-icons/fi";
import CarouselAutoPlay from "../../CarouselAutoPlay";
import { IBanner } from "../../../interfaces/Banner";
import { BannerContainer, Buttons, Container, MemberArea } from "./styles"

interface IIntro {
  goTo: (pathname: string) => void
  banners?: IBanner[]
  userName?: string
}

const Intro: React.FC<IIntro> = ({ goTo, banners }) => {
  return (
    <>
      <Container>
        <Buttons>
          <PrimaryButton onClick={() => goTo("/about")}>
            <><FiHome />Conheça a nossa igreja</>
          </PrimaryButton>

          {/*<PrimaryButton onClick={() => goTo("/about")}>*/}
          {/*    <><FiUser/>Conheça o nosso pastor</>*/}
          {/*</PrimaryButton>*/}
        </Buttons>
        <p>
          Faça-nos uma visita! Será um prazer receber você!
        </p>
        {banners && !!banners.length && (
          <BannerContainer>
            <CarouselAutoPlay banners={banners} />
          </BannerContainer>
        )}

        {/* <button onClick={() => goTo("/groups")} className={styles.pgmContainer}>
          <div></div>
          <div>
            <div>
             <FiUsers/> <h1>Participe de um Pequeno Grupo Multiplicador</h1>
            </div>
            <p>Encontre o pequeno grupo mais perto de você!</p>
            <button> <FiArrowRight /> acesse aqui</button>
          </div>
        </button> */}
      </Container>
    </>
  )
}

export default Intro
