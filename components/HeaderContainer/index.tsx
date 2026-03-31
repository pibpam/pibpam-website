import React, { ReactElement, useContext, useMemo } from "react";
import styles from "../../styles/components/HeaderContainer.module.scss";
import { PostMessageContext } from "../../contexts/postMessage";

interface IHeaderContainer {
  children: ReactElement
  active: boolean
}

const HeaderContainer: React.FC<IHeaderContainer> = ({ children, active }) => {
  const {deviceInfo} = useContext(PostMessageContext)

  return (
    <div
      className={`${styles.container} ${active && styles.active}`}
      style={{ paddingTop: `${(deviceInfo?.top || 0) + 24}px` }}
    >
      {children}
    </div>
  );
}

export default HeaderContainer
