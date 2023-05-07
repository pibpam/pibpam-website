import React, {useEffect, useRef, useState} from "react";
import ThirdButton from "../Button/Third";
import {FiPlus} from "react-icons/fi";
import styles from "../../styles/components/TextCollapse.module.scss"

interface ITextCollapse {
    text: string
}

const defaultHeight = 216

export const TextCollapse: React.FC<ITextCollapse> = ({text}) => {
    const [seeAll, setSeeAll] = useState(false)
    const [maxHeight, setMaxHeight] = useState(0)
    const pRef = useRef<HTMLParagraphElement | undefined>(undefined)

    useEffect(() => {
        const verifyHeight = () => {
            if (maxHeight) {
                return
            }
            if (pRef.current?.clientHeight && pRef.current?.clientHeight > 10) {
                if (pRef.current?.clientHeight <= defaultHeight) {
                    setSeeAll(true)
                    setMaxHeight(pRef.current?.clientHeight)
                    return
                }
                setMaxHeight(pRef.current?.clientHeight)
            } else {
                setTimeout(() => verifyHeight(), 500)
            }
        }

        verifyHeight()
    }, [maxHeight])

    const handleSeeAll = () => {
        setSeeAll(true)
    }

    return (
        <div className={styles.description}>
            <div style={{maxHeight: maxHeight && seeAll ? maxHeight + "px" : "216px"}}>
                {/* @ts-ignore*/}
                <div ref={pRef} dangerouslySetInnerHTML={{__html: text || ""}}></div>
            </div>
            {!seeAll && (
                <div>
                    <ThirdButton onClick={handleSeeAll}>
                        <><FiPlus/> ver mais</>
                    </ThirdButton>
                </div>
            )}
        </div>
    )
}
