import React, { createContext, ReactElement, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { Platform } from "../enum/Platform";

interface Context {
  isApp: boolean
  isIos: boolean
  isAndroid: boolean
  isMobile: boolean
}

export const AppContext = createContext<Context>({} as Context)

export interface IChildren {
  children: ReactElement
}

export const AppContextProvider: React.FC<IChildren> = ({ children }: IChildren) => {
  const { query } = useRouter()
  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isMobile = /mobile|android|iphone|ipad|ipod|blackberry|windows phone/i.test(userAgent);
    setIsMobile(isMobile)
  }, [])

  const isApp = useMemo(() => {
    return [Platform.IOS, Platform.ANDROID].includes(query?.platform as Platform)
  }, [query?.platform])

  const isIos = useMemo(() => {
    return Platform.IOS === query?.platform
  }, [query?.platform])

  const isAndroid = useMemo(() => {
    return Platform.IOS === query?.platform
  }, [query?.platform])

  return (
    <AppContext.Provider
      value={{
        isApp,
        isIos,
        isAndroid,
        isMobile
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
