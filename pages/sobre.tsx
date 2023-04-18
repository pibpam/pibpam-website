import { NextPage } from 'next';
import styles from '../styles/Sobre.module.scss'
import React from 'react';
import Website from '../layout/container/Website';
import Divider, { EDividerColors } from '../components/Divider';

const About: NextPage = () => {
  return (
    <Website>
      <div className={styles.container} >

        <div className={styles.header} >
          <h1>Sobre</h1>
          <h2>Conheça a nossa Igreja.</h2>
        </div>

        <Divider color={EDividerColors.white} />

      <div className={styles.history} >
        <h3>SOBRE A IGREJA</h3>
        História | Missão - Visão - Valores
        <h3>CONHEÇA NOSSO PASTOR</h3>
        História | Formação | Tempo de PIBPM
      </div>

      </div>
    </Website>
  )
}

export default About
