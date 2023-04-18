import React from "react";
import {FiBook, FiBookOpen, FiCalendar, FiPlay, FiRadio} from "react-icons/fi";
import styles from "../../styles/components/TabNavigator.module.scss"
import {useRouter} from "next/router";
const TabNavigator: React.FC = () => {
    const router = useRouter()

    const goTo = async (pathname: string) => {
       await router.push({
            pathname
        })
    }

    return (
        <div className={styles.container} >
            <ul>
                <li>
                    <button onClick={() => goTo("/events")} >
                        <FiPlay/>
                        <span>cultos</span>
                    </button>
                </li>
                <li>
                    <button onClick={() => goTo("/devotionals")} >
                        <FiBookOpen/>
                        <span>devocionais</span>
                    </button>
                </li>
                <li>
                    <button onClick={() => goTo("/event/3424234")} >
                        <FiRadio/>
                        <span>ao vivo</span>
                    </button>
                </li>
                <li>
                    <button onClick={() => goTo("/schedule")} >
                        <FiCalendar/>
                        <span>programação</span>
                    </button>
                </li>
                <li>
                    <button onClick={() => goTo("/bible")} >
                        <FiBook/>
                        <span>bíblia</span>
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default TabNavigator