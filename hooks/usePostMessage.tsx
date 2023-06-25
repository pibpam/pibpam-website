import React, {useContext} from "react";
import {AppContext} from "../contexts/app";

const usePostMessage = () => {
    const {isApp} = useContext(AppContext)
    const sendMessage = (data: Record<string, string>) => {
        // @ts-ignore
        window && window.ReactNativeWebView && window.ReactNativeWebView.postMessage(JSON.stringify({pibpam: data}));
    }

    const openLink = (url: string) => {
        if (isApp) {
            sendMessage({action: "open", url})
            return
        }

        if (window) {
            window.open(url, '_blank')
        }

    }

    return {sendMessage, openLink}
}

export default usePostMessage
