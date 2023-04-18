import React, {ReactElement} from "react";
import styles from "../../../styles/components/Home/BlockHeader.module.scss"

interface IBlockHeader {
    icon: ReactElement
    title: string
}
const BlockHeader: React.FC<IBlockHeader> = ({icon, title}) => {
    return (
        <div className={styles.container} >
            {icon}
            <h3>
                {title}
            </h3>
        </div>
    )
}

export default BlockHeader