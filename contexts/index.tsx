import React from "react";
import {IChildren, LoadingContextProvider} from "./loading";

const Contexts: React.FC<IChildren> = ({children}: IChildren) => {
    return <>
        <LoadingContextProvider>
            {children}
        </LoadingContextProvider>
    </>;
}

export default Contexts;
