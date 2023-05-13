import React, {useContext, useState} from "react";

const useHeader = () => {
    const [scrollActive, setScrollActive] = useState(false)

    const changeScroll = (top: number) => {
        setScrollActive(top > 100)
    }

    return {changeScroll, scrollActive}
}

export default useHeader
