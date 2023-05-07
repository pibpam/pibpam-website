import React, {ReactElement} from "react";
import DividerMobile, {EDividerColors} from "../DividerMobile";
import styles from "../../styles/components/FooterPage.module.scss"

interface IOption {
    text: string
    icon: ReactElement
    action: () => void
}

interface IFooterPage {
    options?: IOption[]
}

const FooterPage: React.FC<IFooterPage> = ({options}) => {
    return (
        <div className={styles.container}>
            <DividerMobile color={EDividerColors.yellow}/>
            <div className={styles.content}>

                {options?.map(option => (
                    <button key={option.text} onClick={option.action}>
                        {option.icon}
                        <div>
                            <span>Ver também:</span>
                            <span>{option.text}</span>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default FooterPage
