import React from "react";
import {FiBook, FiBookOpen, FiCalendar, FiPlay, FiRadio} from "react-icons/fi";
import styles from "../../styles/components/TabNavigator.module.scss"
const TabNavigator: React.FC = () => {
    return (
        <div className={styles.container} >
            <ul>
                <li>
                    <button>
                        <FiPlay/>
                        <span>cultos</span>
                    </button>
                </li>
                <li>
                    <button>
                        <FiBookOpen/>
                        <span>devocionais</span>
                    </button>
                </li>
                <li>
                    <button>
                        <FiRadio/>
                        <span>ao vivo</span>
                    </button>
                </li>
                <li>
                    <button>
                        <FiCalendar/>
                        <span>programação</span>
                    </button>
                </li>
                <li>
                    <button>
                        <FiBook/>
                        <span>bíblia</span>
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default TabNavigator