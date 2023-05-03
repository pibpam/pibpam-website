import React from "react";
import styles from "../../styles/components/Spinner.module.scss"

const Spinner: React.FC = () => {
    return (
        <div className={styles.spinner__container} >
            <svg className={styles.spinner} viewBox="0 0 50 50">
                <circle cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
            </svg>
        </div>
    )
}

export default Spinner
