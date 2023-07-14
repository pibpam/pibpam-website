import React, {createContext, ReactElement, useEffect, useState} from "react";

interface Context {
    allSeen: boolean
    setAllSeen: (data: boolean) => void
}

export const NoticesContext = createContext<Context>({} as Context)

export interface IChildren {
    children: ReactElement
}

export const NoticesContextProvider: React.FC<IChildren> = ({children}: IChildren) => {
    const [allSeen, setAllSeen] = useState<boolean>(false)

    useEffect(() => {
        setAllSeen(!!localStorage.getItem('seen'))
    }, [])

    useEffect(() => {
        if (allSeen) {
            localStorage.setItem('seen', 'TRUE')
        }
    }, [allSeen])

    return (
        <NoticesContext.Provider
            value={{
                allSeen,
                setAllSeen
            }}
        >
            {children}
        </NoticesContext.Provider>
    )
}
