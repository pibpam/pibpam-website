import type { NextPage } from 'next'
import styles from '../styles/Events.module.scss'
import Website from '../layout/container/Website'
import DividerMobile, { EDividerColors } from "../components/DividerMobile";
import Header from "../components/Header";
import useMenu from "../hooks/useMenu";
import HeaderPage from "../components/HeaderPage";
import React from "react";
import { FiBookOpen, FiCalendar } from "react-icons/fi";
import FooterPage from "../components/FooterPage";
import { Api } from "../services/api";
import EmptyState from "../components/EmptyState";
import { useAppNavigation } from "../hooks/useAppNavigation";
import useHeader from "../hooks/useHeader";
import HeaderContainer from "../components/HeaderContainer";
import { ICollection } from '../interfaces/Collection';
import CollectionCard from '../components/CollectionCard';

interface ICollectionsPage {
  collections: ICollection[]
}

const Collections: NextPage<ICollectionsPage> = ({ collections }) => {
  const { open, toggleMenu } = useMenu()
  const { goTo: goToHook } = useAppNavigation()
  const { scrollActive, changeScroll } = useHeader()

  const goTo = async (pathname: string) => {
    await goToHook({ pathname, showLoading: true })
  }

  return (
    <Website title={"Galeria de Fotos"} changeScroll={changeScroll} openMenu={open} toggleMenu={toggleMenu}>
      <>
        <HeaderContainer active={scrollActive}>
          <Header toggleMenu={toggleMenu} />
        </HeaderContainer>
        {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
        <HeaderPage title={<>Galeria de Fotos</>} />
        <DividerMobile color={EDividerColors.white} />
        <div className={styles.container}>
          <div className={styles.grid}>
            {
              collections.map(item => (
                <CollectionCard data={item} key={item.uuid} onClick={() => goTo("/collection/" + item.uuid)} />
              ))
            }

            {!collections.length && (
              <EmptyState />
            )}
          </div>
        </div>
        <FooterPage
          options={[
            {
              text: "Devocionais",
              icon: <FiBookOpen />,
              action: () => goTo("/devotionals")
            },
            {
              text: "Agenda",
              icon: <FiCalendar />,
              action: () => goTo("/schedule")
            }
          ]}
        />
      </>
    </Website>
  )
}

export async function getStaticProps() {
  const api = new Api()
  const collections = await api.getCollections()
  return { props: { collections } }
}


export default Collections
