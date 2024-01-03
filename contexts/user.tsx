import React, { createContext, ReactElement, useEffect, useState} from "react";
import { getToken } from "../utils/LocalStorage";
import { ApiLocal } from "../services/apiLocal";
import { IUser } from "../interfaces/User";

interface Context {
  user?: IUser,
  token?: string
  initUser: () => void
}

export const UserContext = createContext<Context>({} as Context)

export interface IChildren {
  children: ReactElement
}

export const UserContextProvider: React.FC<IChildren> = ({ children }: IChildren) => {
  const [token, setToken] = useState("")
  const [user, setUser] = useState<IUser | undefined>()

  const getUser = async (token: string) => {
    try {
      const api = new ApiLocal()
      const data = await api.getMe(token)
      setUser(data)
    } catch (err) {
      console.error(err)
    }
  }

  const initUser = () => {
    const token = getToken()
    if (token) {
      setToken(token)
      getUser(token)
    }
  }

  useEffect(() => {
    initUser()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <UserContext.Provider
      value={{
        token, user, initUser
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
