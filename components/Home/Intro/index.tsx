import React from "react";
import PrimaryButton from "../../Button/Primary";
import {FiHome} from "react-icons/fi";
import styles from "../../../styles/components/Home/Intro.module.scss"
import CarouselAutoPlay from "../../CarouselAutoPlay";
import {IBanner} from "../../../interfaces/Banner";

interface IIntro {
    goTo: (pathname: string) => void
    banners?: IBanner[]
}

const Intro: React.FC<IIntro> = ({goTo, banners}) => {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.buttons}>
                    <PrimaryButton onClick={() => goTo("/about")}>
                        <><FiHome/>Conheça a nossa igreja</>
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
                        <CarouselAutoPlay banners={banners}/>
                    </div>
                )}
            </div>
        </>
    )
}

export default Intro
