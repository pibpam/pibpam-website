import React, { createContext, ReactElement, useEffect, useState} from "react";
import { clearToken, getToken } from "../utils/LocalStorage";
import { ApiLocal } from "../services/apiLocal";
import { IUser } from "../interfaces/User";
import {
  loginWithEmailAndPassword,
  loginWithGoogle,
  logoutUser,
  refreshAccessTokenFromFirebase,
  registerWithEmailAndPassword,
} from "../services/auth";
import { observeFirebaseIdToken } from "../services/firebaseClient";

interface Context {
  user?: IUser;
  token?: string;
  initUser: () => void;
  isLoadingAuth: boolean;
  // true até a primeira tentativa de restaurar a sessão (token salvo) terminar —
  // enquanto isso, ainda não sabemos se o usuário é membro ou não.
  isLoadingUser: boolean;
  authError?: string;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  loginGoogle: () => Promise<string>;
  logout: () => void;
  authenticateByToken: (accessToken: string) => Promise<void>;
}

export const UserContext = createContext<Context>({} as Context)

export interface IChildren {
  children: ReactElement
}

export const UserContextProvider: React.FC<IChildren> = ({ children }: IChildren) => {
  const [token, setToken] = useState("")
  const [user, setUser] = useState<IUser | undefined>()
  const [isLoadingAuth, setIsLoadingAuth] = useState(false)
  const [isLoadingUser, setIsLoadingUser] = useState(true)
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
    } finally {
      setIsLoadingUser(false)
    }
  }

  const initUser = () => {
    const token = getToken()
    if (token) {
      setToken(token)
      getUser(token)
    } else {
      setIsLoadingUser(false)
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
      return accessToken
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

  // Mantém o accessToken do backend sincronizado com o idToken do Firebase:
  // dispara ao restaurar a sessão persistida (page load) e a cada renovação
  // automática dele (~1h), sem exigir novo login. Sem sessão Firebase (ex.:
  // token recebido do app nativo via authenticateByToken) o listener some,
  // já que getFirebaseApp() lança e o observe nunca chega a ser inscrito.
  useEffect(() => {
    let unsubscribe: (() => void) | undefined

    try {
      unsubscribe = observeFirebaseIdToken(async (idToken) => {
        if (!idToken) return

        try {
          const accessToken = await refreshAccessTokenFromFirebase(idToken)
          setToken(accessToken)
          await getUser(accessToken)
        } catch (err) {
          console.error(err)
        }
      })
    } catch (err) {
      // Firebase não configurado neste ambiente — segue só pelo accessToken salvo.
    }

    return () => unsubscribe?.()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <UserContext.Provider
      value={{
        token,
        user,
        initUser,
        isLoadingAuth,
        isLoadingUser,
        authError,
        login,
        register,
        loginGoogle,
        logout,
        authenticateByToken,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
