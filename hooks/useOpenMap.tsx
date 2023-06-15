import React from "react";
import {Platform} from "../enum/Platform";

const useOpenMap = () => {
    const getHref = (address: string, platform?: Platform) => {
        if (platform === Platform.IOS) {
            return "https://maps.apple.com/?daddr=" + address
        }
        //
        // if (platform === Platform.ANDROID) {
        //     return "geo:" + data.schedule.addressRedirect
        // }
        return "https://www.google.com/maps/dir/?api=1&destination=" + address
    }
    return {getHref}
}

export default useOpenMap
