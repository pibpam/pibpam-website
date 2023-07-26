import React, { createContext, ReactElement, useEffect, useRef, useState } from "react";
import { useAppNavigation } from "../hooks/useAppNavigation";
import usePostMessage from "../hooks/usePostMessage";

interface Context {
}

export const PostMessageContext = createContext<Context>({} as Context)

export interface IChildren {
  children: ReactElement
}

enum EActions {
  GOBACK = 'goBack',
  LINKING = 'linking'
}

export const PostMessageContextProvider: React.FC<IChildren> = ({ children }: IChildren) => {
  const started = useRef(false)
  const { goBack, goTo } = useAppNavigation()
  const {sendMessage} = usePostMessage()

  const [action, setAction] = useState("")

  useEffect(() => {
    if (action === EActions.GOBACK) {
      goBack({}).then()
      setAction("")
    }

    if (action === EActions.LINKING) {
      goTo({ pathname: '/', resetHistory: true, showLoading: true }).then()
      setAction("")
    }
    // eslint-disable-next-line
  }, [action])

  const handleEventPostMessage = (event: MessageEvent) => {
    if (["http://localhost:3000", "https://pibpam-website.vercel.app", "htts://pibpam.org"].includes(event.origin)) {
      return
    }

    const data = JSON.parse(event.data)

    if (!data.pibpam || !data.pibpam.action) {
      return
    }

    if (data.pibpam.action === EActions.GOBACK) {
      setAction(EActions.GOBACK)
    }

    if (data.pibpam.action === EActions.LINKING) {
      alert(EActions.LINKING)
      setAction(EActions.LINKING)
    }
  }

  const init = () => {
    if (started.current) {
      return
    }
    started.current = true
    window.addEventListener("message", handleEventPostMessage);
    // @ts-ignore
    document.addEventListener("message", handleEventPostMessage);
    sendMessage({action: 'ok'})
  }

  useEffect(() => {
    init()
    // eslint-disable-next-line
  }, [])

  return (
    <PostMessageContext.Provider
      value={{}}
    >
      {children}
    </PostMessageContext.Provider>
  )
}
