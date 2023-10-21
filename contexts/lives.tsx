import React, { createContext, ReactElement, useEffect, useState } from "react";
import { IContent } from "../interfaces/Contens";
import axios from "axios";
import { IBroadcast } from "../interfaces/Broadcast";

interface Context {
  lives: IBroadcast[]
}

export const LivesContext = createContext<Context>({} as Context)

export interface IChildren {
  children: ReactElement
}

export const LivesContextProvider: React.FC<IChildren> = ({ children }: IChildren) => {

  const [lives, setLives] = useState<IBroadcast[]>([])

  const getLives = async () => {
    const { data } = await axios.get<IBroadcast[]>("/api/lives")
    setLives(data)
  }

  const handleGetLives = () => {
    setInterval(() => {
      getLives()
    }, 300000)
  }

  useEffect(() => {
    getLives()
    handleGetLives()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
