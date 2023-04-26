import React from "react";
import {IChildren, LoadingContextProvider} from "./loading";
import {LivesContextProvider} from "./lives";

const Contexts: React.FC<IChildren> = ({children}: IChildren) => {
    return <>
        <LoadingContextProvider>
            <LivesContextProvider>
                {children}
            </LivesContextProvider>
        </LoadingContextProvider>
    </>;
}

export default Contexts;
