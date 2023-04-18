import React from "react";
import DividerMobile, {EDividerColors} from "../DividerMobile";
import {FiBookOpen, FiCalendar} from "react-icons/fi";
import styles from "../../styles/components/FooterPage.module.scss"
const FooterPage: React.FC = () => {
    return(
        <div className={styles.container} >
            <DividerMobile color={EDividerColors.yellow} />
            <div className={styles.content} >
                <button>
                    <FiBookOpen/>
                    <div>
                        <span>Ver também:</span>
                        <span>Devocionais</span>
                    </div>
                </button>

                <button>
                    <FiCalendar/>
                    <div>
                        <span>Ver também:</span>
                        <span>Programação</span>
                    </div>
                </button>
            </div>
        </div>
    )
}

export default FooterPage