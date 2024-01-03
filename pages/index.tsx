import type { NextPage } from 'next'
import { EDividerColors } from '../components/Divider'
import Website from '../layout/container/Website'
import Banner from "../components/Home/Banner";
import DividerMobile from "../components/DividerMobile";
import Header from "../components/Header";
import Intro from "../components/Home/Intro";
import Transmission from "../components/Home/Transmission";
import Schedule from "../components/Home/Schedule";
import useMenu from "../hooks/useMenu";
import { Api } from "../services/api";
import { IContent } from "../interfaces/Contens";
import { IScheduleDate } from "../interfaces/Schedule";
import { useContext } from "react";
import { LivesContext } from "../contexts/lives";
import { IDevotinal } from "../interfaces/Devotinal";
import { useAppNavigation } from "../hooks/useAppNavigation";
import HeaderContainer from "../components/HeaderContainer";
import useHeader from "../hooks/useHeader";
import Series from "../components/Home/Series";
import { ISeries } from "../interfaces/Series";
import { IBanner } from "../interfaces/Banner";
import { ICollection } from '../interfaces/Collection';
import Collections from '../components/Home/Collections';
import { UserContext } from '../contexts/user';

interface IHome {
  content?: IContent
  schedules: IScheduleDate[]
  devotionals: IDevotinal[]
  series: ISeries[]
  banners: IBanner[]
  collections: ICollection[]
}

const Home: NextPage<IHome> = ({ content, schedules, devotionals, series, banners, collections }) => {
  const { open, toggleMenu } = useMenu()
  const { lives } = useContext(LivesContext)
  const { goTo: goToHook } = useAppNavigation()
  const { scrollActive, changeScroll } = useHeader()
  const { user } = useContext(UserContext)

  const goTo = async (pathname: string) => {
    await goToHook({ pathname, showLoading: true })
  }

  return (
    <Website changeScroll={changeScroll} openMenu={open} toggleMenu={toggleMenu}>
      <>
        <HeaderContainer active={scrollActive}>
          <Header toggleMenu={toggleMenu} />
        </HeaderContainer>
        <Banner />
        <DividerMobile />
        <Intro userName={user?.member.name} banners={banners} goTo={goTo} />
        <DividerMobile color={EDividerColors.white} />
        <Transmission goTo={goTo} live={lives[0] || undefined} content={content} />
        {schedules && schedules.length && (
          <Schedule schedules={schedules} goTo={goTo} />
        )}
        {devotionals && !!devotionals.length && (
          <>
            <DividerMobile color={EDividerColors.yellow} />
            <Collections collections={collections} goTo={goTo} />
          </>
        )}
        <Series
          goTo={goTo}
          series={series}
        />
      </>
    </Website>
  )
}

export async function getStaticProps() {
  const api = new Api()
  const banners = await api.getBanners()
  const schedules = await api.getSchedules(7)
  const content = await api.getContents(1, "transmission", 1)
  const devotionals = await api.getDevotionals(5)
  const series = await api.getSeries(1, 5)
  const collections = await api.getCollections()
  return { props: { content: content.data[0] || undefined, schedules, devotionals, series: series.data, banners, collections: collections.slice(0, 5) } }
}


export default Home
