import React, { createContext, ReactElement, useEffect, useState} from "react";
import { clearToken, getToken } from "../utils/LocalStorage";
import { ApiLocal } from "../services/apiLocal";
import { IUser } from "../interfaces/User";
import {
  loginWithEmailAndPassword,
  loginWithGoogle,
  logoutUser,
  registerWithEmailAndPassword,
} from "../services/auth";

interface Context {
  user?: IUser,
  token?: string
  initUser: () => void
  isLoadingAuth: boolean
  authError?: string
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  loginGoogle: () => Promise<void>
  logout: () => void
}

export const UserContext = createContext<Context>({} as Context)

export interface IChildren {
  children: ReactElement
}

export const UserContextProvider: React.FC<IChildren> = ({ children }: IChildren) => {
  const [token, setToken] = useState("")
  const [user, setUser] = useState<IUser | undefined>()
  const [isLoadingAuth, setIsLoadingAuth] = useState(false)
  const [authError, setAuthError] = useState<string | undefined>()

  const getUser = async (token: string) => {
    try {
      const api = new ApiLocal()
      const data = await api.getMe(token)
      setUser(data)
      setAuthError(undefined)
    } catch (err) {
      clearToken()
      setToken("")
      setUser(undefined)
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

  const authenticateByToken = async (accessToken: string) => {
    setToken(accessToken)
    await getUser(accessToken)
  }

  const login = async (email: string, password: string) => {
    setIsLoadingAuth(true)
    setAuthError(undefined)
    try {
      const accessToken = await loginWithEmailAndPassword(email, password)
      await authenticateByToken(accessToken)
    } catch (err: any) {
      setAuthError(err?.message || "Nao foi possivel autenticar")
      throw err
    } finally {
      setIsLoadingAuth(false)
    }
  }

  const register = async (name: string, email: string, password: string) => {
    setIsLoadingAuth(true)
    setAuthError(undefined)
    try {
      const accessToken = await registerWithEmailAndPassword(name, email, password)
      await authenticateByToken(accessToken)
    } catch (err: any) {
      setAuthError(err?.message || "Nao foi possivel criar a conta")
      throw err
    } finally {
      setIsLoadingAuth(false)
    }
  }

  const loginGoogle = async () => {
    setIsLoadingAuth(true)
    setAuthError(undefined)
    try {
      const accessToken = await loginWithGoogle()
      await authenticateByToken(accessToken)
    } catch (err: any) {
      setAuthError(err?.message || "Nao foi possivel autenticar com Google")
      throw err
    } finally {
      setIsLoadingAuth(false)
    }
  }

  const logout = () => {
    logoutUser()
    setToken("")
    setUser(undefined)
    setAuthError(undefined)
  }

  useEffect(() => {
    initUser()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <UserContext.Provider
      value={{
        token,
        user,
        initUser,
        isLoadingAuth,
        authError,
        login,
        register,
        loginGoogle,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
