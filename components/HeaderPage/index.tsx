import React, {ReactElement} from "react";
import styles from "../../styles/components/HeaderPage.module.scss"

interface IHeaderPage {
    title?: string | ReactElement
    image?: string
}

const HeaderPage: React.FC<IHeaderPage> = ({title, image}) => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1>{title}</h1>
            </div>
            <div className={styles.backdrop}/>
        </div>
    )
}

export default HeaderPage