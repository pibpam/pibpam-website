import React, {useContext} from "react";
import {FiBook, FiBookOpen, FiCalendar, FiPlay, FiRadio} from "react-icons/fi";
import styles from "../../styles/components/TabNavigator.module.scss"
import {useRouter} from "next/router";
import useLoading from "../../hooks/useLoading";
import {LivesContext} from "../../contexts/lives";
import {useAppNavigation} from "../../hooks/useAppNavigation";

const TabNavigator: React.FC = () => {
    const router = useRouter()
    const {pathname} = router

    const {handleOpen, handleClose} = useLoading()
    const {lives} = useContext(LivesContext)
    const {goTo: goToHook} = useAppNavigation()

    const goTo = async (pathname: string) => {
        await handleOpen()
        await goToHook({
            pathname
        })
        handleClose()
    }

    return (
        <div className={styles.container}>
            <ul>
                <li>
                    <button className={`${pathname === "/events" && styles.active}`} onClick={() => goTo("/events")}>
                        <FiPlay/>
                        <span>cultos</span>
                    </button>
                </li>
                <li>
                    <button className={`${pathname === "/devotionals" && styles.active}`}
                            onClick={() => goTo("/devotionals")}>
                        <FiBookOpen/>
                        <span>devocionais</span>
                    </button>
                </li>
                {!!lives.length && (
                    <li>
                        <button className={`${pathname === "/event/live" && styles.active}`}
                                onClick={() => goTo("/event/live")}>
                            <FiRadio/>
                            <span>ao vivo</span>
                        </button>
                    </li>
                )}
                <li>
                    <button className={`${pathname === "/schedule" && styles.active}`}
                            onClick={() => goTo("/schedule")}>
                        <FiCalendar/>
                        <span>programação</span>
                    </button>
                </li>
                <li>
                    <button className={`${pathname === "/bible" && styles.active}`} onClick={() => goTo("/bible")}>
                        <FiBook/>
                        <span>bíblia</span>
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default TabNavigator
