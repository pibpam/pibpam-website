import React from "react";
import {IChildren, LoadingContextProvider} from "./loading";
import {LivesContextProvider} from "./lives";
import {PostMessageContextProvider} from "./postMessage";

const Contexts: React.FC<IChildren> = ({children}: IChildren) => {
    return <>
        <LoadingContextProvider>
            <PostMessageContextProvider>
                <LivesContextProvider>
                    {children}
                </LivesContextProvider>
            </PostMessageContextProvider>
        </LoadingContextProvider>
    </>;
}

export default Contexts;
