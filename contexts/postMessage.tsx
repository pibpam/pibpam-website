import React, {createContext, ReactElement, useEffect, useRef} from "react";

interface Context {
}

export const PostMessageContext = createContext<Context>({} as Context)

export interface IChildren {
    children: ReactElement
}

export const PostMessageContextProvider: React.FC<IChildren> = ({children}: IChildren) => {

    const started = useRef(false)

    const init = () => {
        console.log("init")
        if (started.current) {
            return
        }
        started.current = true
        window.addEventListener("message", (event) => {
            if (event.data && event.data.pibpam) {
                console.log(event.data.pibpam)
                alert(JSON.stringify(event.data.pibpam))
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
