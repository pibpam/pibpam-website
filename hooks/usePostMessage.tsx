import React from "react";

const usePostMessage = () => {
    const sendMessage = (data: Record<string, string>) => {
        // @ts-ignore
        window && window.ReactNativeWebView && window.ReactNativeWebView.postMessage(JSON.stringify({pibpam: data}));
    }
    return {sendMessage}
}

export default usePostMessage
