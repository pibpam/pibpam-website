import React, { ReactElement, useContext, useMemo } from "react";
import styles from "../../styles/components/HeaderContainer.module.scss";
import { AppContext } from "../../contexts/app";

interface IHeaderContainer {
  children: ReactElement
  active: boolean
}

const HeaderContainer: React.FC<IHeaderContainer> = ({ children, active }) => {
  const {isMobile, isApp} = useContext(AppContext)

  const isMobileBrowser = useMemo(() => {
    return !isApp && isMobile
  }, [isApp, isMobile])

  return (
    <div className={`${styles.container} ${active && styles.active}`} style={{ paddingTop: isMobileBrowser ? '24px' : '56px'}} >
      {children}
    </div>
  )
}

export default HeaderContainer
