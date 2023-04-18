import React from "react";

import styles from '../../../styles/components/Home/Banner.module.scss'

const Banner: React.FC = () => {
    return (
        <div className={styles.banner}>
            <div className={styles.content} >
                <h1>Bem-Vindo(a) á PIB Pará de Minas</h1>
                <h2>Um lugar para você e para sua família.</h2>
            </div>
            <div className={styles.backdrop}  />
        </div>
    )
}

export default Banner