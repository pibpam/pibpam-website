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
            if (["http://localhost:3000", "https://pibpam-website.vercel.app"].includes(event.origin)) {
                return
            }

            alert(event.data)
            alert(event.data.pibpam)

            const data = JSON.parse(event.data)
            alert(data.pibpam.action)

            console.log(event.origin)
            console.log(event.data)

            if (event.data && event.data?.pibpam) {
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
