import React, {ReactElement} from "react";
import styles from "../../styles/components/HeaderPage.module.scss"

interface IHeaderPage {
    title?: string | ReactElement
    background?: string
}

const HeaderPage: React.FC<IHeaderPage> = ({title, background}) => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1>{title}</h1>
            </div>
            <div className={styles.backdrop} style={{
                background: "url('" + (background ? background : "/carrossel-min.png") + "') center/cover"
            }}/>
        </div>
    )
}

export default HeaderPage
