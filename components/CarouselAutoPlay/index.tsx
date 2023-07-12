import React, {useState} from 'react';

import styles from '../../styles/components/CarouselAutoPlay.module.scss'
import Carousel from "../Carousel";

type CarouselAutoPlay = {}

const CarouselAutoPlay: React.FC<CarouselAutoPlay> = () => {
    const [active, setActive] = useState(1)
    const [percent, setPercent] = useState(0)

    return (
        <div className={styles.container}>
            <Carousel onChange={(active) => setActive(active)} onChangePercent={percent => setPercent(percent)}
                      autoStart padding={0} gap={0}>
                <>
                    <div onClick={() => alert('aaaa')} className={styles.item}>Teste 1</div>
                    <div className={styles.item}>Teste 2</div>
                    <div className={styles.item}>Teste 3</div>
                </>
            </Carousel>
            <div className={styles.stepper}>
                <div>
                    <div style={{width: active === 1 ? `${percent}%` : 0}} />
                </div>
                <div>
                    <div style={{width: active === 2 ? `${percent}%` : 0}} />
                </div>
                <div>
                    <div style={{width: active === 3 ? `${percent}%` : 0}} />
                </div>
            </div>
        </div>
    );
}

export default CarouselAutoPlay;
