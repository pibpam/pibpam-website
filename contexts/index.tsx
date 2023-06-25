import React from "react";
import {IChildren, LoadingContextProvider} from "./loading";
import {LivesContextProvider} from "./lives";
import {PostMessageContextProvider} from "./postMessage";
import {AppContextProvider} from "./app";

const Contexts: React.FC<IChildren> = ({children}: IChildren) => {
    return <>
        <AppContextProvider>
            <LoadingContextProvider>
                <PostMessageContextProvider>
                    <LivesContextProvider>
                        {children}
                    </LivesContextProvider>
                </PostMessageContextProvider>
            </LoadingContextProvider>
        </AppContextProvider>
    </>;
}

export default Contexts;
