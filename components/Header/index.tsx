import React from 'react';
import styles from '../../styles/components/Header.module.scss'
import Image from "next/image";
import {FiMenu, FiX} from "react-icons/fi";
import {useRouter} from "next/router";

interface IHeader {
    toggleMenu: () => void
    isOpen?: boolean
}

const Header: React.FC<IHeader> = ({toggleMenu, isOpen= false}) => {

    const router = useRouter()

    const goToHome = async () => {
        await router.push({
            pathname: "/"
        })
    }

    return (
        <div className={`${styles.container}`}>
            <div>
                <button onClick={goToHome} >
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