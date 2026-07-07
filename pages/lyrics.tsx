import type { NextPage } from 'next'
import { ContainerBooks, HeaderWrap } from '../styles/Bible'
import Website from '../layout/container/Website'
import Header from "../components/Header";
import useMenu from "../hooks/useMenu";
import { FiChevronRight } from "react-icons/fi";
import { useAppNavigation } from "../hooks/useAppNavigation";

const Lyrics: NextPage = () => {
  const { open, toggleMenu } = useMenu()
  const { goTo: goToHook, goBack } = useAppNavigation()

  const goTo = async (pathname: string) => {
    await goToHook({ pathname, showLoading: true })
  }

  return (
    <Website title={"Hinários"} openMenu={open} hasTabNavigator={false} toggleMenu={toggleMenu}>
      <>
        <HeaderWrap>
          <Header goBack={() => goBack({})} title={"Hinários"} toggleMenu={toggleMenu} />
        </HeaderWrap>
        <ContainerBooks>
          <button onClick={() => goTo("/lyrics/cc")}>
            Cantor Cristão <FiChevronRight />
          </button>
          <button onClick={() => goTo("/lyrics/hcc")}>
            Hinário para o Culto Cristão <FiChevronRight />
          </button>
        </ContainerBooks>
        {/* <FooterPage
          options={[
            {
              text: "Bíblia",
              icon: <FiBook />,
              action: () => goTo("/bible")
            },
          ]}
        /> */}
      </>
    </Website>
  )
}

export default Lyrics
