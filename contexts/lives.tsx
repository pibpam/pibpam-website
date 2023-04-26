import React, {createContext, ReactElement, useEffect, useState} from "react";
import {IContent} from "../interfaces/Contens";
import axios from "axios";

interface Context {
    lives: IContent[]
}

export const LivesContext = createContext<Context>({} as Context)

export interface IChildren {
    children: ReactElement
}

export const LivesContextProvider: React.FC<IChildren> = ({children}: IChildren) => {

    const [lives, setLives] = useState<IContent[]>([])

    const getLives = async () => {
        const {data} = await axios.get<IContent[]>("/api/lives")
        setLives(data)
    }


    useEffect(() => {
        getLives()
    }, [])

    return (
        <LivesContext.Provider
            value={{
                lives
            }}
        >
            {children}
        </LivesContext.Provider>
    )
}
