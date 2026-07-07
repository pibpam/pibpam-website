import React, { useContext } from 'react';
import Image from "next/image";
import { FiBell, FiChevronLeft, FiMenu, FiX } from "react-icons/fi";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import { NoticesContext } from "../../contexts/notices";
import { Container, GoBack, Notifications, Title } from "./styles"

interface IHeader {
  toggleMenu: () => void
  isOpen?: boolean
  title?: string
  goBack?: () => void
}

const Header: React.FC<IHeader> = ({ toggleMenu, isOpen = false, title, goBack }) => {
  const { goTo: goToHook } = useAppNavigation()
  const { totalUnsee } = useContext(NoticesContext)

  const goToHome = async () => {
    await goToHook({ pathname: "/", showLoading: true, resetHistory: true })
  }

  return (
    <Container>
      <div>
        {goBack && (
          <GoBack onClick={goBack}>
            <FiChevronLeft />
          </GoBack>
        )}
        {title ? <Title>{title}</Title> :
          <button onClick={goToHome}>
            <Image src="/pibpam-logo.svg" alt="PIBPM logo" width={120} height={31} />
          </button>
        }
      </div>
      <Notifications onClick={() => goToHook({ pathname: '/notices', showLoading: true })}>
        {!!totalUnsee && (<span>{totalUnsee}</span>)}<FiBell /></Notifications>
      <GoBack onClick={toggleMenu}>
        {isOpen ? <FiX /> : <FiMenu />}
      </GoBack>
    </Container>
  );
}

export default Header;
