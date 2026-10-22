import React, { useContext } from "react";
import { FiBook, FiCalendar, FiFilm, FiPlay } from "react-icons/fi";
import { useRouter } from "next/router";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import { Container } from "./styles";
import { PostMessageContext } from "../../contexts/postMessage";

const TabNavigator: React.FC = () => {
  const router = useRouter()
  const { pathname } = router
  const { deviceInfo } = useContext(PostMessageContext)
  const { goTo: goToHook } = useAppNavigation()

  const goTo = async (pathname: string) => {
    await goToHook({ pathname, showLoading: true, resetHistory: true })
  }

  return (
    <Container bottom={deviceInfo?.bottom}>
      <ul>
        <li>
          <button className={`${pathname === "/events" && 'active'}`} onClick={() => goTo("/events")}>
            <FiPlay />
            <span>cultos</span>
          </button>
        </li>
        <li>
          <button className={`${pathname === "/series" && 'active'}`}
            onClick={() => goTo("/series")}>
            <FiFilm />
            <span>séries</span>
          </button>
        </li>

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
