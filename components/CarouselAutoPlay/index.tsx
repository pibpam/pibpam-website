import React, {useState} from 'react';

import styles from '../../styles/components/CarouselAutoPlay.module.scss'
import Carousel from "nuka-carousel"
import {EBannerType, IBanner} from "../../interfaces/Banner";
import Banner from "../Banner";
import usePostMessage from "../../hooks/usePostMessage";
import {useAppNavigation} from "../../hooks/useAppNavigation";

type CarouselAutoPlay = {
    banners: IBanner[]
}

const CarouselAutoPlay: React.FC<CarouselAutoPlay> = ({banners}) => {
    const [active, setActive] = useState(0)
    const {openLink} = usePostMessage()
    const {goTo} = useAppNavigation()

    const handleOpenLink = (banner: IBanner) => {
        if (banner.type === EBannerType.NO_ACTION) {
            return
        }

        if (banner.type === EBannerType.EXTERNAL && banner.url) {
            openLink(banner.url)
            return
        }

        if (banner.type === EBannerType.INTERNAL && banner.url) {
            goTo({pathname: banner.url, showLoading: true}).then()
            return
        }
    }

    return (
        <>
            <div className={styles.container}>
                <Carousel
                    autoplay
                    slideIndex={0}
                    slidesToShow={1}
                    disableEdgeSwiping={false}
                    withoutControls
                    autoplayInterval={10000}
                    wrapAround
                    afterSlide={(index) => setActive(index)}
                >
                    {banners.map(banner => (<div key={banner.uuid} className={styles.item}>
                        <Banner data={banner} onClick={() => handleOpenLink(banner)}/>
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
