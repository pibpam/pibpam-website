import React, {useState} from "react";
import {FiBook, FiBookOpen, FiCalendar, FiChevronRight, FiHome, FiPlay, FiRadio, FiUsers} from "react-icons/fi";
import styles from "../../styles/components/Menu.module.scss"
import Header from "../Header";

interface IMenu {
    toggleMenu: () => void
}

const Menu: React.FC<IMenu> = ({toggleMenu}) => {

    const [isClosing, setIsClosing] = useState(false)

    const handleClose = () => {
        setIsClosing(true)
        setTimeout(() => {
            toggleMenu()
            setIsClosing(false)
        }, 550)
    }

    return (
        <div className={`${styles.container} ${isClosing && styles.animation_out}`}>
            <Header isOpen toggleMenu={handleClose}/>
            <ul>
                <li>
                    <button>
                        <FiHome/>
                        <div>
                            <span>Sobre a PIBPAM</span>
                            <span>História // Contatos // Localização</span>
                        </div>
                        <FiChevronRight/>
                    </button>
                </li>
                <li>
                    <button>
                        <FiRadio/>
                        <div>
                            <span>Ao Vivo</span>
                        </div>
                        <FiChevronRight/>
                    </button>
                </li>
                <li>
                    <button>
                        <FiPlay/>
                        <div>
                            <span>Cultos</span>
                        </div>
                        <FiChevronRight/>
                    </button>
                </li>
                <li>
                    <button>
                        <FiBookOpen/>
                        <div>
                            <span>Devocionais</span>
                        </div>
                        <FiChevronRight/>
                    </button>
                </li>
                <li>
                    <button>
                        <FiBook/>
                        <div>
                            <span>Bíblia</span>
                        </div>
                        <FiChevronRight/>
                    </button>
                </li>
                <li>
                    <button>
                        <FiCalendar/>
                        <div>
                            <span>Programação</span>
                        </div>
                        <FiChevronRight/>
                    </button>
                </li>
                <li>
                    <button>
                        <FiUsers/>
                        <div>
                            <span>Ministérios</span>
                        </div>
                        <FiChevronRight/>
                    </button>
                </li>
            </ul>
            <div>
                <p>Desenvolvido por Ljtech Desenvolvimento de Sistemas LTDA.</p>
                <p>Todos os direitos pertencem a Primeira Igreja Batista em Pará de Minas. © 2023</p>
            </div>
        </div>
    )
}

export default Menu;