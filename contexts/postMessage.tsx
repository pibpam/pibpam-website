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
        if (started.current) {
            return
        }
        started.current = true
        window.addEventListener("message", (event) => {
            console.log(event)
            alert("Frame window alert 1");
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
