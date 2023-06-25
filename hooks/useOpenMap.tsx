import React, {useContext} from "react";
import {AppContext} from "../contexts/app";

const useOpenMap = () => {
    const {isIos} = useContext(AppContext)

    const getHref = (address: string) => {
        if (isIos) {
            return "https://maps.apple.com/?daddr=" + address
        }
        return "https://www.google.com/maps/dir/?api=1&destination=" + address
    }
    return {getHref}
}

export default useOpenMap
