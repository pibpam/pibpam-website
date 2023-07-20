import type { NextPage } from 'next'
import React from "react";
import styles from "../styles/Privacy.module.scss"

const Privacy: NextPage = () => {
  return (
    <div className={styles.container}>
      <a href="pibpamapp://teste">Teste</a>
    </div>
  )
}

export default Privacy
