import React from "react";
import styles from "../../../styles/components/Home/Devotionals.module.scss";
import BlockHeader from "../BlockHeader";
import {FiBookOpen} from "react-icons/fi";
import Carousel from "../../Carousel";
import {IDevotinal} from "../../../interfaces/Devotinal";
import DevotionalCard from "../../DevotionalCard";


interface IDevotionals {
    devotionals?: IDevotinal[]
    goTo: (path: string) => void
}

const Devotionals: React.FC<IDevotionals> = ({devotionals, goTo}) => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <BlockHeader
                    icon={<FiBookOpen color={"#383838"}/>}
                    title="Últimos Devocionais"
                />
                <div className={styles.caroussel_controlls}>
                    <p>
                        Todo dia um novo devocional para você! <a onClick={() => goTo("/devotionals")}>Ver tudo.</a>
                    </p>
                </div>
            </div>
            <div>
                <Carousel>
                    <>
                        {devotionals && devotionals.map(item => (
                                <div key={item.uuid} className={styles.card_container}>
                                    <DevotionalCard
                                        onClick={() => goTo("/devotional/" + item.uuid)}
                                        devotional={item}/>
                                </div>
                            )
                        )}
                    </>
                </Carousel>
            </div>
        </div>
    )
}

export default Devotionals
