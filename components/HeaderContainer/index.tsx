import React, {ReactElement} from "react";
import styles from "../../styles/components/HeaderContainer.module.scss";

interface IHeaderContainer {
    children: ReactElement
    active: boolean
}

const HeaderContainer: React.FC<IHeaderContainer> = ({children, active}) => {
    return (
        <div className={`${styles.container} ${active && styles.active}`}>
            {children}
        </div>
    )
}

export default HeaderContainer
