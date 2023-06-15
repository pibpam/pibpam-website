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

    const sendMessage = () => {
        // @ts-ignore
        window.ReactNativeWebView.postMessage({pibpam: {teste: 123}});
    }

    const [action, setAction] = useState("")

    useEffect(() => {
        if (action) {
            goBack({})
            setAction("")
            sendMessage()
        }
    }, [action])

    const init = () => {
        if (started.current) {
            return
        }
        sendMessage()
        started.current = true
        window.addEventListener("message", (event) => {
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
        });
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
