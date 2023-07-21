/* eslint-disable react-hooks/exhaustive-deps */
import type { NextPage } from 'next'
import React, { useContext, useEffect } from "react";
import styles from "../styles/Privacy.module.scss"
import { AppContext } from '../contexts/app';

const Privacy: NextPage = () => {
  const { isApp } = useContext(AppContext)

  useEffect(() => {
    if (!isApp) {
      window.open('pibpamapp://path/into/app?hello=world')
    }
  }, [])

  return (
    <div className={styles.container}>
      <a href="pibpamapp://path/into/app?hello=world">Teste</a>
    </div>
  )
}

export default Privacy
