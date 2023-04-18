import React from "react";
import PrimaryButton from "../../Button/Primary";
import {FiHome, FiUser} from "react-icons/fi";
import styles from "../../../styles/components/Home/Intro.module.scss"

const Intro : React.FC = () => {
    return (
        <div className={styles.container}  >
            <div className={styles.buttons} >
                <PrimaryButton >
                    <><FiHome />Conheça a nossa igreja</>
                </PrimaryButton>

                <PrimaryButton >
                    <><FiUser />Conheça o nosso pastor</>
                </PrimaryButton>
            </div>
            <p>
                Faça-nos uma visita! Será um prazer receber você!
            </p>
        </div>
    )
}

export default Intro