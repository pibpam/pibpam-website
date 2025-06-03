import React, { useContext } from "react";
import { AppContext } from "../contexts/app";

const usePostMessage = () => {
  const { isApp } = useContext(AppContext)
  const sendMessage = (data: Record<string, string>) => {
    // @ts-ignore
    window && window.ReactNativeWebView && window.ReactNativeWebView.postMessage(JSON.stringify({ pibpam: data }));
  }

  const openLink = (url: string) => {
    if (isApp) {
      sendMessage({ action: "open", url })
      return
    }

    if (window) {
      window.open(url, '_blank')
    }

  }

  const saveImage = (url: string, fallback: string) => {
    if (isApp) {
      sendMessage({ action: "saveImage", url, fallback })
      return
    }

    if (window) {
      window.open(url, '_blank')
    }
  }

  const share = async (message: string, url: string) => {
    if (isApp) {
      sendMessage({ action: "share", message, url })
      return
    }

    if (navigator) {
      await navigator.share({ url, title: message });
    }

  }

  return { sendMessage, openLink, share, saveImage }
}

export default usePostMessage
