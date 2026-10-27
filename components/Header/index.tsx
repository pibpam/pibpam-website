import React from 'react';
import Image from "next/image";
import { useRouter } from "next/router";
import { FiChevronLeft } from "react-icons/fi";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import { Container, GoBack, Title } from "./styles"

interface IHeader {
  title?: string
  goBack?: () => void
}

const Header: React.FC<IHeader> = ({ title, goBack }) => {
  const router = useRouter()
  const { goTo: goToHook, goBack: goBackHook } = useAppNavigation()

  const goToHome = async () => {
    await goToHook({ pathname: "/", resetHistory: true })
  }

  // Todas as páginas, exceto a Home, voltam por padrão (histórico ou Home)
  const handleGoBack = goBack ?? (router.pathname !== "/" ? () => goBackHook({}) : undefined)

  return (
    <Container>
      <div>
        {handleGoBack && (
          <GoBack onClick={handleGoBack}>
            <FiChevronLeft />
          </GoBack>
        )}
        {title ? <Title>{title}</Title> :
          <button onClick={goToHome}>
            <Image src="/pibpam-logo.svg" alt="PIBPM logo" width={120} height={31} />
          </button>
        }
      </div>
    </Container>
  );
}

export default Header;
