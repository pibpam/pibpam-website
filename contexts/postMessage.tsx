import React, {createContext, ReactElement, useEffect, useRef, useState} from "react";
import {useAppNavigation} from "../hooks/useAppNavigation";

interface Context {
}

export const PostMessageContext = createContext<Context>({} as Context)

export interface IChildren {
    children: ReactElement
}

enum EActions {
    GOBACK = 'goBack'
}

export const PostMessageContextProvider: React.FC<IChildren> = ({children}: IChildren) => {
    const started = useRef(false)
    const {goBack} = useAppNavigation()

    const [action, setAction] = useState("")

    useEffect(() => {
        if (action) {
            goBack({})
            setAction("")
        }
    }, [action])

    const handleEventPostMessage = (event: MessageEvent) => {
        alert(event.origin)

        if (["http://localhost:3000", "https://pibpam-website.vercel.app"].includes(event.origin)) {
            return
        }

        const data = JSON.parse(event.data)

        if (!data.pibpam || !data.pibpam.action) {
            return
        }

        if (data.pibpam.action === EActions.GOBACK) {
            setAction(EActions.GOBACK)
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
    }

    useEffect(() => {
        init()
    }, [])

    return (
        <PostMessageContext.Provider
            value={{}}
        >
            {children}
        </PostMessageContext.Provider>
    )
}
