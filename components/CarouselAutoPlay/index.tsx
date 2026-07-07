import React, {useState} from 'react';

import Carousel from "nuka-carousel"
import {EBannerType, IBanner} from "../../interfaces/Banner";
import Banner from "../Banner";
import usePostMessage from "../../hooks/usePostMessage";
import {useAppNavigation} from "../../hooks/useAppNavigation";
import { Container, Item, StepFill, Stepper, StepTrack } from './styles'

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
            <Container>
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
                    {banners.map(banner => (<Item key={banner.uuid}>
                        <Banner data={banner} onClick={() => handleOpenLink(banner)}/>
                    </Item>))}
                </Carousel>
            </Container>
            <Stepper>
                {banners.map((banner, index) => (
                    <StepTrack key={banner.uuid}>
                        <StepFill $active={active === index} />
                    </StepTrack>
                ))}
            </Stepper>
        </>
    );
}

export default CarouselAutoPlay;
