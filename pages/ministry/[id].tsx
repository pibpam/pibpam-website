import type {NextPage} from 'next'
import styles from '../../styles/Ministry.module.scss'
import Website from '../../layout/container/Website'
import DividerMobile, {EDividerColors} from "../../components/DividerMobile";
import Header from "../../components/Header";
import useMenu from "../../hooks/useMenu";
import HeaderPage from "../../components/HeaderPage";
import {useRouter} from "next/router";
import {FiCalendar} from "react-icons/fi";
import React from "react";
import Title from "../../components/Title";

const Ministry: NextPage = () => {
    const {open, toggleMenu} = useMenu()
    const router = useRouter()

    const goBack = async () => {
        await router.push({pathname: "/ministries"})
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
                    <h1>JUBAP</h1>
                    <h2>Juventude Batista Pará de Minas</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lectus tellus, egestas id metus
                        eu, fringilla vestibulum est. Mauris ut porta massa. Nam porttitor commodo ipsum in ullamcorper.
                        Morbi metus enim, venenatis at laoreet a, convallis a velit. Integer libero mi, varius eu diam
                        et, cursus malesuada libero. Donec fermentum tellus vel auctor iaculis. Quisque vitae convallis
                        elit, vel scelerisque nulla. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec
                        malesuada suscipit porta. Nullam ex eros, congue non velit nec, blandit laoreet tortor.
                    </p>
                </div>
                <Title>Equipe</Title>
                <div className={styles.team}>
                    <div className={styles.team_item}>
                        <div></div>
                        <div>Marco Oliveira</div>
                        <div>Líder</div>
                    </div>
                    <div className={styles.team_item}>
                        <div></div>
                        <div>Marco Oliveira</div>
                        <div>Líder</div>
                    </div>
                    <div className={styles.team_item}>
                        <div></div>
                        <div>Marco Oliveira</div>
                        <div>Líder</div>
                    </div>
                    <div className={styles.team_item}>
                        <div></div>
                        <div>Marco Oliveira</div>
                        <div>Líder</div>
                    </div>
                    <div className={styles.team_item}>
                        <div></div>
                        <div>Marco Oliveira</div>
                        <div>Líder</div>
                    </div>
                    <div className={styles.team_item}>
                        <div></div>
                        <div>Marco Oliveira</div>
                        <div>Líder</div>
                    </div>
                </div>
            </>
        </Website>
    )
}

export default Ministry
