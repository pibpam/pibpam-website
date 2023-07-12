import React, {ReactElement, useEffect, useRef, useState} from 'react';
import {v4 as uuidv4} from 'uuid';

import styles from '../../styles/components/Carousel.module.scss'

type Carousel = {
    children: ReactElement
    padding?: number
    gap?: number
    autoStart?: boolean
    onChange?: (selected: number) => void
    onChangePercent?: (percent: number) => void
}

const Carousel: React.FC<Carousel> = ({
                                          onChange,
                                          onChangePercent,
                                          children,
                                          padding = 24,
                                          autoStart = false,
                                          gap = 8
                                      }: Carousel) => {
    const [sliderGrabbed, setSliderGrabbed] = useState(false)
    const slider = useRef<null | HTMLDivElement>(null)
    const currentPosition = useRef(0)
    const intervalRef = useRef<undefined | NodeJS.Timeout>()
    const passTimeSeconds = useRef(0)
    const currentItem = useRef(1)

    const [id, setId] = useState('')

    useEffect(() => {
        if (!id) {
            setId(uuidv4())
        }
    }, [id])

    const onChangeItem = (item: number) => {
        onChange && onChange(item)
    }

    const onChangePercentItem = (seconds: number) => {
        onChangePercent && onChangePercent(seconds * 100 / 10)
    }

    const nextPage = () => {
        const slider = document.getElementById(id);

        if (slider && slider.parentElement) {
            const newCurrent = currentPosition.current + slider.parentElement.clientWidth
            currentPosition.current = newCurrent >= slider.parentElement.scrollWidth ? 0 : newCurrent
            currentItem.current = currentPosition.current === 0 ? 1 : currentItem.current + 1
            // console.log(currentItem.current)
            onChangeItem(currentItem.current)
            slider.parentElement.scroll({
                left: newCurrent >= slider.parentElement.scrollWidth ? 0 : newCurrent,
                behavior: 'smooth'
            })
        }
    }

    const timeControl = () => {
        clearInterval(intervalRef.current)
        intervalRef.current = setTimeout(() => {
            passTimeSeconds.current = passTimeSeconds.current + 1
            if (passTimeSeconds.current > 10) {
                nextPage()
                clearInterval(intervalRef.current)
                passTimeSeconds.current = 0
                onChangePercentItem(0)
            } else {
                onChangePercentItem(passTimeSeconds.current)
            }
            timeControl()
        }, 1000)
    }

    const initInterval = () => {
        timeControl()
        // clearInterval(intervalRef.current)
        // intervalRef.current = setInterval(() => {
        //     nextPage()
        // }, 10000)
    }

    useEffect(() => {
        if (autoStart) {
            initInterval()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, autoStart])

    useEffect(() => {
        setTimeout(() => {
            if (slider && slider.current) {
                slider.current.style.width = (slider.current?.firstElementChild?.clientWidth || 0 + padding + padding) + 'px'
            }
        }, 500)
    }, [padding])


    const onMouseMove = (e: any) => {
        // e.preventDefault()

        const slider = document.getElementById(id);

        if (!slider) {
            return
        }

        if (sliderGrabbed && slider.parentElement) {
            const delta = (e.changedTouches[0].clientX - window.innerWidth / 2) * 0.5;
            slider.parentElement.scrollLeft -= (e.movementX || (e.changedTouches[0].clientX + delta));
        }
    }

    const onMouseDown = () => {
        setSliderGrabbed(true);
    }

    const onMouseLeave = () => {
        setSliderGrabbed(false);
        const slider = document.getElementById(id);

        if (slider && slider.parentElement) {
            const isBack = slider.parentElement.scrollLeft < currentPosition.current
            let diff = slider.parentElement.scrollLeft - currentPosition.current
            diff = isBack ? -diff : diff
            const percent = 100 * diff / slider.parentElement.clientWidth

            if (percent < 50) {
                slider.parentElement.scroll({
                    left: currentPosition.current,
                    behavior: 'smooth'
                })
                return
            }

            const newCurrent = isBack ? currentPosition.current - slider.parentElement.clientWidth : currentPosition.current + slider.parentElement.clientWidth
            currentPosition.current = newCurrent

            currentItem.current = isBack ? currentItem.current - 1 : currentItem.current + 1
            passTimeSeconds.current = 0
            onChangePercentItem(0)
            onChangeItem(currentItem.current)

            slider.parentElement.scroll({
                left: newCurrent,
                behavior: 'smooth'
            })
        }
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
                    onTouchMove={onMouseMove}
                    onTouchCancel={onMouseLeave}
                    onTouchEnd={onMouseLeave}
                    onTouchStart={onMouseDown}

                    // onMouseMove={onMouseMove}
                    // onMouseUp={onMouseLeave}
                    // onMouseDown={onMouseDown}
                    // onMouseLeave={onMouseLeave}
                    style={{cursor: sliderGrabbed ? 'grabbing' : 'grab', padding: `0 ${padding}px`}}
                >
                    <div style={{
                        gap: `${gap}px`
                    }}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Carousel;
