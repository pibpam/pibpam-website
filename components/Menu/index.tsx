import React, { useContext, useState } from "react";
import {
  FiBell,
  FiBook,
  FiBookOpen,
  FiCalendar,
  FiChevronRight,
  FiFilm,
  FiHome,
  FiImage,
  FiPlay,
  FiRadio,
  FiUsers
} from "react-icons/fi";
import styles from "../../styles/components/Menu.module.scss"
import Header from "../Header";
import { LivesContext } from "../../contexts/lives";
import { useAppNavigation } from "../../hooks/useAppNavigation";

interface IMenu {
  toggleMenu: () => void
}

const Menu: React.FC<IMenu> = ({ toggleMenu }) => {
  const [isClosing, setIsClosing] = useState(false)
  const { lives } = useContext(LivesContext)
  const { goTo: goToHook } = useAppNavigation()

  const goTo = async (pathname: string) => {
    handleCloseMenu()
    await goToHook({ pathname, showLoading: true, resetHistory: true })
  }

  const handleCloseMenu = () => {
    setIsClosing(true)
    setTimeout(() => {
      toggleMenu()
      setIsClosing(false)
    }, 550)
  }

  return (
    <div className={`${styles.container} ${isClosing && styles.animation_out}`}>
      <Header isOpen toggleMenu={handleCloseMenu} />
      <ul>
        <li>
          <button onClick={() => goTo("/about")}>
            <FiHome />
            <div>
              <span>Sobre a PIBPAM</span>
              <span>História // Contatos // Localização</span>
            </div>
            <FiChevronRight />
          </button>
        </li>
        {!!lives.length && (
          <li onClick={() => goTo("/event/" + lives[0].uuid)}>
            <button>
              <FiRadio />
              <div>
                <span>Ao Vivo</span>
              </div>
              <FiChevronRight />
            </button>
          </li>
        )}
        <li>
          <button onClick={() => goTo("/events")}>
            <FiPlay />
            <div>
              <span>Cultos</span>
            </div>
            <FiChevronRight />
          </button>
        </li>
        {/*<li>*/}
        {/*    <button onClick={() => goTo("/preaches")}>*/}
        {/*        <FiBookmark/>*/}
        {/*        <div>*/}
        {/*            <span>Exposições</span>*/}
        {/*        </div>*/}
        {/*        <FiChevronRight/>*/}
        {/*    </button>*/}
        {/*</li>*/}
        <li>
          <button onClick={() => goTo("/series")}>
            <FiFilm />
            <div>
              <span>Séries</span>
            </div>
            <FiChevronRight />
          </button>
        </li>
        <li>
          <button onClick={() => goTo("/devotionals")}>
            <FiBookOpen />
            <div>
              <span>Devocionais</span>
            </div>
            <FiChevronRight />
          </button>
        </li>
        <li>
          <button onClick={() => goTo("/bible")}>
            <FiBook />
            <div>
              <span>Bíblia</span>
            </div>
            <FiChevronRight />
          </button>
        </li>
        <li>
          <button onClick={() => goTo("/schedule")}>
            <FiCalendar />
            <div>
              <span>Agenda</span>
            </div>
            <FiChevronRight />
          </button>
        </li>
        <li>
          <button onClick={() => goTo("/ministries")}>
            <FiUsers />
            <div>
              <span>Ministérios</span>
            </div>
            <FiChevronRight />
          </button>
        </li>
        <li>
          <button onClick={() => goTo("/notices")}>
            <FiBell />
            <div>
              <span>Avisos</span>
            </div>
            <FiChevronRight />
          </button>
        </li>
        <li>
          <button onClick={() => goTo("/collections")}>
            <FiImage />
            <div>
              <span>Galeria</span>
            </div>
            <FiChevronRight />
          </button>
        </li>
      </ul>
      <div>
        <p>
          {/*Desenvolvido por Ljtech Desenvolvimento de Sistemas LTDA.*/}
        </p>
        <p>Todos os direitos pertencem a Primeira Igreja Batista em Pará de Minas. © 2023</p>
      </div>
    </div>
  )
}

export default Menu;
