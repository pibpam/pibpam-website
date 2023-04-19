import type {NextPage} from 'next'
import styles from '../../styles/Event.module.scss'
import Website from '../../layout/container/Website'
import DividerMobile, {EDividerColors} from "../../components/DividerMobile";
import Header from "../../components/Header";
import useMenu from "../../hooks/useMenu";
import HeaderPage from "../../components/HeaderPage";
import {useRouter} from "next/router";
import {FiCalendar} from "react-icons/fi";
import React from "react";

const Devotional: NextPage = () => {
    const {open, toggleMenu} = useMenu()
    const router = useRouter()

    const goBack = async () => {
        await router.push({pathname: "/devotionals"})
    }

    return (
        <Website openMenu={open} toggleMenu={toggleMenu}>
            <>
                <div className={styles.header_container}>
                    <Header goBack={goBack} toggleMenu={toggleMenu}/>
                </div>
                <HeaderPage/>
                <DividerMobile color={EDividerColors.white}/>
                <div className={styles.container}>
                    <h1>As bençãos do justo</h1>
                    <div className={styles.header}>
                        <div>
                            <div></div>
                            Pr. Alex Oliveira
                        </div>
                        <div><FiCalendar/>14 mai, 2023</div>
                    </div>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lectus tellus, egestas id metus
                        eu, fringilla vestibulum est. Mauris ut porta massa. Nam porttitor commodo ipsum in ullamcorper.
                        Morbi metus enim, venenatis at laoreet a, convallis a velit. Integer libero mi, varius eu diam
                        et, cursus malesuada libero. Donec fermentum tellus vel auctor iaculis. Quisque vitae convallis
                        elit, vel scelerisque nulla. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec
                        malesuada suscipit porta. Nullam ex eros, congue non velit nec, blandit laoreet tortor.
                    </p>
                </div>
            </>
        </Website>
    )
}

export default Devotional
