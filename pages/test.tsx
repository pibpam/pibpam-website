/* eslint-disable react-hooks/exhaustive-deps */
import type { NextPage } from 'next'
import React, { useContext, useEffect } from "react";
import { Container } from "../styles/Privacy"
import { AppContext } from '../contexts/app';

const Privacy: NextPage = () => {
  const { isApp } = useContext(AppContext)

  useEffect(() => {
    if (!isApp) {
      window.location.href = 'pibpamapp://path/'
    }
  }, [])

  return (
    <Container>
      <a href="pibpamapp://path/">Teste</a>
    </Container>
  )
}

export default Privacy
