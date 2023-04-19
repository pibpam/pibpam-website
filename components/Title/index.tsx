import React, {ReactElement} from "react";
import styles from "../../styles/components/Title.module.scss"

interface ITitle {
    children?: ReactElement | string
}

const Title: React.FC<ITitle> = ({children}) => {
    return (
        <div className={styles.container}>
            <div>{children}</div>
        </div>
    )
}

export default Title