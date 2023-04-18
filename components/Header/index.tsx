import React from 'react';
import styles from '../../styles/components/Header.module.scss'
import Image from "next/image";
import {FiMenu, FiX} from "react-icons/fi";

interface IHeader {
    toggleMenu: () => void
    isOpen?: boolean
}

const Header: React.FC<IHeader> = ({toggleMenu, isOpen= false}) => {
    return (
        <div className={`${styles.container}`}>
            <div>
                <button>
                    <Image src="/pibpam-logo.svg" alt="PIBPM logo" width={120} height={31}/>
                </button>
            </div>
            <button onClick={toggleMenu} className={styles.go_back}>
                {isOpen ? <FiX/> : <FiMenu/>}
            </button>
        </div>
    );
}

export default Header;