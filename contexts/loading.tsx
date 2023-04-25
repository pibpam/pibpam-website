import React, {createContext, ReactElement, useState} from "react";

interface Context {
    isLoading: boolean
    setIsLoading: (data: boolean) => void
}

export const LoadingContext = createContext<Context>({} as Context)

export interface IChildren {
    children: ReactElement
}

export const LoadingContextProvider: React.FC<IChildren> = ({children}: IChildren) => {

    const [isLoading, setIsLoading] = useState<boolean>(false)

    return (
        <LoadingContext.Provider
            value={{
                isLoading,
                setIsLoading
            }}
        >
            {children}
        </LoadingContext.Provider>
    )
}
