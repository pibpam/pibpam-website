import React, {ReactElement, useEffect, useRef, useState} from 'react';
import {v4 as uuidv4} from 'uuid';

import styles from '../../styles/components/Carousel.module.scss'

type Carousel = {
    children: ReactElement
}

const Carousel: React.FC<Carousel> = ({children}: Carousel) => {

    const [sliderGrabbed, setSliderGrabbed] = useState(false)
    const slider = useRef<null | HTMLDivElement>(null)

    const [id, setId] = useState('')

    useEffect(() => {
        if (!id) {
            setId(uuidv4())
        }
    }, [id])


    useEffect(() => {
        setTimeout(() => {
            if (slider && slider.current) {
                slider.current.style.width = (slider.current?.firstElementChild?.clientWidth || 24 + 24) + 'px'
            }
        }, 500)
    }, [])


    const onMouseMove = (e: any) => {
        e.preventDefault()

        const slider = document.getElementById(id);

        if (!slider) {
            return
        }

        if (sliderGrabbed && slider.parentElement) {
            slider.parentElement.scrollLeft -= e.movementX;
        }
    }

    const onMouseDown = () => {
        setSliderGrabbed(true);
    }

    const onMouseLeave = () => {
        setSliderGrabbed(false);
    }

    if (!id) {
        return null
    }

    return (
        <div className={styles.sliderWrap}>
            <div className={styles.slider}>
                <div
                    className={styles.sliderInner}
                    ref={slider}
                    id={id}
                    onMouseMove={onMouseMove}
                    onMouseUp={onMouseLeave}
                    onMouseDown={onMouseDown}
                    onMouseLeave={onMouseLeave}
                    style={{cursor: sliderGrabbed ? 'grabbing' : 'grab'}}
                >
                    <div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Carousel;
