import React from 'react';
import styles from '../../styles/components/Header.module.scss'
import Image from "next/image";
import {FiMenu} from "react-icons/all";

const Header: React.FC = () => {
    return (
        <div className={`${styles.container}`} >
            <div>
                <button>
                    <Image src="/pibpam-logo.svg" alt="PIBPM logo" width={120} height={31} />
                </button>
            </div>
            <button className={styles.go_back} >
                <FiMenu/>
            </button>
        </div>
    );
}

export default Header;