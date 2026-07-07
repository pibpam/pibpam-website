import React, { ReactElement } from "react";
import { Backdrop, Container, Content } from "./styles"

interface IHeaderPage {
  title?: string | ReactElement
  background?: string
}

const HeaderPage: React.FC<IHeaderPage> = ({ title, background }) => {
  return (
    <Container>
      <Content>
        <h1>{title}</h1>
      </Content>
      <Backdrop style={{
        background: "url('" + (background ? background : "https://pibpam.s3.us-east-1.amazonaws.com/gallery/52636b9a-2a83-41d1-9aa5-88cc06726a84.jpeg") + "') center/cover"
      }} />
    </Container>
  )
}

export default HeaderPage
