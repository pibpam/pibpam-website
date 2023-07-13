import React, {useState} from 'react';

import styles from '../../styles/components/CarouselAutoPlay.module.scss'
import Carousel from "nuka-carousel"
import {IBanner} from "../../interfaces/Banner";
import Banner from "../Banner";

type CarouselAutoPlay = {
    banners: IBanner[]
}

const CarouselAutoPlay: React.FC<CarouselAutoPlay> = ({banners}) => {
    const [active, setActive] = useState(1)

    return (
        <>
            <div className={styles.container}>
                <Carousel
                    autoplay
                    disableEdgeSwiping={false}
                    withoutControls
                    autoplayInterval={10000}
                    wrapAround
                    beforeSlide={(index) => setActive(index)}
                >
                    {banners.map(banner => (<div key={banner.uuid} className={styles.item}>
                        <Banner data={banner} onClick={() => alert("Oi")}/>
                    </div>))}
                </Carousel>
            </div>
            <div className={styles.stepper}>
                {banners.map((banner, index) => (
                    <div key={banner.uuid}>
                        <div className={`${active === index && styles.activeStep}`}/>
                    </div>
                ))}
            </div>
        </>
    );
}

export default CarouselAutoPlay;
