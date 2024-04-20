import React, { useContext } from "react";
import { FiBook, FiBookOpen, FiCalendar, FiFilm, FiPlay, FiRadio } from "react-icons/fi";
import { useRouter } from "next/router";
import { LivesContext } from "../../contexts/lives";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import { Container } from "./styles";

const TabNavigator: React.FC = () => {
  const router = useRouter()
  const { pathname } = router
  const { lives } = useContext(LivesContext)
  const { goTo: goToHook } = useAppNavigation()

  const goTo = async (pathname: string) => {
    await goToHook({ pathname, showLoading: true, resetHistory: true })
  }

  return (
    <Container>
      <ul>
        <li>
          <button className={`${pathname === "/events" && 'active'}`} onClick={() => goTo("/events")}>
            <FiPlay />
            <span>cultos</span>
          </button>
        </li>
        {/* <li>
          <button className={`${pathname === "/devotionals" && 'active'}`}
            onClick={() => goTo("/devotionals")}>
            <FiBookOpen />
            <span>devocional</span>
          </button>
        </li> */}
        <li>
          <button className={`${pathname === "/series" && 'active'}`}
            onClick={() => goTo("/series")}>
            <FiFilm />
            <span>séries</span>
          </button>
        </li>

        {!!lives.length && (
          <li>
            <button className={`${pathname === "/live" && 'active'}`}
              onClick={() => goTo("/live")}>
              <FiRadio />
              <span>ao vivo</span>
            </button>
          </li>
        )}
        <li>
          <button className={`${pathname.includes("/schedule") && 'active'}`}
            onClick={pathname.includes("/schedule") ? undefined : () => goTo("/schedule")}>
            <FiCalendar />
            <span>agenda</span>
          </button>
        </li>
        <li>
          <button className={`${pathname === "/bible" && 'active'}`} onClick={() => goTo("/bible")}>
            <FiBook />
            <span>bíblia</span>
          </button>
        </li>
      </ul>
    </Container>
  )
}

export default TabNavigator
