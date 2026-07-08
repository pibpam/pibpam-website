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
  const { query } = useRouter();
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // User-agent sniffing sozinho falha dentro do WebView do app nativo
    // (a UA customizada nem sempre contém "mobile"), então também
    // consideramos a largura da viewport — mesmo breakpoint usado no resto
    // do site (768px) — para decidir o que é "mobile" (ex.: BottomSheet vs
    // modal no componente Modal).
    const checkIsMobile = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      const isMobileUserAgent =
        /mobile|android|iphone|ipad|ipod|blackberry|windows phone/i.test(
          userAgent,
        );
      setIsMobile(isMobileUserAgent || window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  /**
   * @deprecated
   */
  const isApp = useMemo(() => {
    return [Platform.IOS, Platform.ANDROID].includes(
      query?.platform as Platform,
    );
  }, [query?.platform]);

  /**
   * @deprecated
   */
  const isIos = useMemo(() => {
    return Platform.IOS === query?.platform;
  }, [query?.platform]);

  /**
   * @deprecated
   */
  const isAndroid = useMemo(() => {
    return Platform.ANDROID === query?.platform;
  }, [query?.platform]);

  return (
    <AppContext.Provider
      value={{
        isApp,
        isIos,
        isAndroid,
        isMobile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
