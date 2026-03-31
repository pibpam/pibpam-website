import React, { ReactElement, useContext, useMemo } from "react";
import styles from "../../styles/components/HeaderContainer.module.scss";
import { AppContext } from "../../contexts/app";
import { PostMessageContext } from "../../contexts/postMessage";

interface IHeaderContainer {
  children: ReactElement
  active: boolean
}

const HeaderContainer: React.FC<IHeaderContainer> = ({ children, active }) => {
  const {isMobile, isApp} = useContext(AppContext)
  const {deviceInfo} = useContext(PostMessageContext)

  return (
    <div
      className={`${styles.container} ${active && styles.active}`}
      style={{ paddingTop: `${deviceInfo?.top || 56}px` }}
    >
      {children}
    </div>
  );
}

export default HeaderContainer
