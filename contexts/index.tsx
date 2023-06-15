import React from "react";
import {IChildren, LoadingContextProvider} from "./loading";
import {LivesContextProvider} from "./lives";
import {PostMessageContextProvider} from "./postMessage";

const Contexts: React.FC<IChildren> = ({children}: IChildren) => {
    return <>
        <PostMessageContextProvider>
            <LoadingContextProvider>
                <LivesContextProvider>
                    {children}
                </LivesContextProvider>
            </LoadingContextProvider>
        </PostMessageContextProvider>
    </>;
}

export default Contexts;
