import type { NextPage } from 'next'
import Website from '../../layout/container/Website'
import DividerMobile, { EDividerColors } from "../../components/DividerMobile";
import Header from "../../components/Header";
import useMenu from "../../hooks/useMenu";
import HeaderPage from "../../components/HeaderPage";
import { Api } from "../../services/api";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import useHeader from "../../hooks/useHeader";
import HeaderContainer from "../../components/HeaderContainer";
import { FiCalendar, FiChevronLeft, FiChevronRight, FiImage, FiX } from "react-icons/fi";
import styles from "../../styles/Collection.module.scss"
import { GetStaticPaths } from "next";
import { ICollection } from '../../interfaces/Collection';
import { useState } from 'react';
import { DateUtils } from '../../utils/Date';

interface ICollectionPage {
  data: ICollection
}

interface IParams {
  params: {
    id: string
  }
}

const Collection: NextPage<ICollectionPage> = ({ data }) => {
  const { open, toggleMenu } = useMenu()
  const { goBack } = useAppNavigation()
  const { scrollActive, changeScroll } = useHeader()
  const [selected, setSelected] = useState(0)
  const [photos] = useState(data.photos.map((item, index) => ({ ...item, index: index + 1 })))

  return (
    <Website title={`${data.title}`} changeScroll={changeScroll} hasTabNavigator={false} openMenu={open}
      toggleMenu={toggleMenu}>
      <>
        <HeaderContainer active={scrollActive}>
          <Header goBack={() => goBack({})} toggleMenu={toggleMenu} />
        </HeaderContainer>
        <HeaderPage background={data.image} />
        <DividerMobile color={EDividerColors.white} />
        {!!selected && (
          <div className={styles.modal} >
            <button onClick={() => setSelected(0)} ><FiX /></button>
            <div className={styles.controlls} >
              <button disabled={selected === 1} onClick={() => setSelected(state => state - 1)} ><FiChevronLeft /></button>
              <button disabled={selected >= photos.length} onClick={() => setSelected(state => state + 1)} ><FiChevronRight /></button>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photos[selected - 1].image} alt="" />
          </div>
        )}
        <div className={styles.container}>
          <div className={styles.header}>
            <h2>{data.title}</h2>
            <div>
              <p>
                <FiImage /> {photos.length} {data.photos.length > 1 ? "Fotos" : "Foto"}
              </p>
              <p>
                <FiCalendar /> {DateUtils.formatDateDayAndMonth(data.collectionDate)}
              </p>
            </div>
          </div>
          <div className={styles.grid}>
            {photos.map(item => (
              // eslint-disable-next-line @next/next/no-img-element
              <div onClick={() => setSelected(item.index)} key={item.uuid} style={{ background: `url('${item.image}') center/cover` }} />
            ))}
          </div>
        </div>
      </>
    </Website>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }: IParams) {
  const api = new Api()
  const data = await api.getCollection(params.id)
  if (!data) {
    return {
      notFound: true,
    };
  }
  return { props: { data } }
}

export default Collection
