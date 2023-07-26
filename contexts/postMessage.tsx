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

interface DataLink {
  route: string, params: Record<string, string>
}

export const PostMessageContextProvider: React.FC<IChildren> = ({ children }: IChildren) => {
  const started = useRef(false)
  const { goBack, goTo } = useAppNavigation()
  const { sendMessage } = usePostMessage()

  const [action, setAction] = useState("")
  const [dataLink, setDataLink] = useState<DataLink>({} as DataLink)

  useEffect(() => {
    if (action === EActions.GOBACK) {
      goBack({}).then()
      setAction("")
    }

    if (action === EActions.LINKING) {
      const route = dataLink.route ? `/${dataLink.route}` : '/'
      goTo({ pathname: route, resetHistory: true, showLoading: true }).then()
      setAction("")
      setDataLink({} as DataLink)
    }
    // eslint-disable-next-line
  }, [action])

  const handleEventPostMessage = (event: MessageEvent) => {
    if (["http://localhost:3000", "https://pibpam-website.vercel.app", "https://pibpam.org", "https://www.pibpam.org"].includes(event.origin)) {
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
      setDataLink({
        route: data.pibpam.route,
        params: data.pibpam.params,
      })

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
    sendMessage({ action: 'ok' })
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
