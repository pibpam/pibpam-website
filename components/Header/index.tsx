import React, { useContext } from 'react';
import styles from '../../styles/components/Header.module.scss'
import Image from "next/image";
import { FiBell, FiChevronLeft, FiMenu, FiX } from "react-icons/fi";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import { NoticesContext } from "../../contexts/notices";

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
    <div className={`${styles.container}`}>
      <div>
        {goBack && (
          <button className={styles.go_back} onClick={goBack}>
            <FiChevronLeft />
          </button>
        )}
        {title ? <div className={styles.title}>{title}</div> :
          <button onClick={goToHome}>
            <Image src="/pibpam-logo.svg" alt="PIBPM logo" width={120} height={31} />
          </button>
        }
      </div>
      <button onClick={() => goToHook({ pathname: '/notices', showLoading: true })} className={styles.notifications}>
        {!!totalUnsee && (<span>{totalUnsee}</span>)}<FiBell /></button>
      <button onClick={toggleMenu} className={styles.go_back}>
        {isOpen ? <FiX /> : <FiMenu />}
      </button>
    </div>
  );
}

export default Header;
