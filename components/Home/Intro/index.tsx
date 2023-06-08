import React from "react";
import PrimaryButton from "../../Button/Primary";
import {FiHome} from "react-icons/fi";
import styles from "../../../styles/components/Home/Intro.module.scss"

interface IIntro {
    goTo: (pathname: string) => void
}

const Intro: React.FC<IIntro> = ({goTo}) => {
    return (
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
        </div>
    )
}

export default Intro
