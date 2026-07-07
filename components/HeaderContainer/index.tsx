import React, { ReactElement, useContext } from "react";
import { PostMessageContext } from "../../contexts/postMessage";
import { Container } from "./styles"

interface IHeaderContainer {
  children: ReactElement
  active: boolean
}

const HeaderContainer: React.FC<IHeaderContainer> = ({ children, active }) => {
  const {deviceInfo} = useContext(PostMessageContext)

  return (
    <Container
      $active={active}
      style={{ paddingTop: `${(deviceInfo?.top || 0) + 24}px` }}
    >
      {children}
    </Container>
  );
}

export default HeaderContainer
