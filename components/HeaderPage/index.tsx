import React, { ReactElement } from "react";
import styles from "../../styles/components/HeaderPage.module.scss"

interface IHeaderPage {
  title?: string | ReactElement
  background?: string
}

const HeaderPage: React.FC<IHeaderPage> = ({ title, background }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>{title}</h1>
      </div>
      <div className={styles.backdrop} style={{
        background: "url('" + (background ? background : "https://pibpam.s3.us-east-1.amazonaws.com/gallery/52636b9a-2a83-41d1-9aa5-88cc06726a84.jpeg") + "') center/cover"
      }} />
    </div>
  )
}

export default HeaderPage
