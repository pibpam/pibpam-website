import React from "react";

const usePostMessage = () => {
    const sendMessage = (data: Record<string, string>) => {
        // @ts-ignore
        window && window.ReactNativeWebView && window.ReactNativeWebView.postMessage(JSON.stringify({pibpam: data}));
    }

    const openLink = (url: string) => {
        sendMessage({action: "open", url})
    }

    return {sendMessage, openLink}
}

export default usePostMessage
