import React from "react";
import { IChildren } from "./lives";
import { LivesContextProvider } from "./lives";
import { PostMessageContextProvider } from "./postMessage";
import { AppContextProvider } from "./app";

const Contexts: React.FC<IChildren> = ({ children }: IChildren) => {
  return <>
    <AppContextProvider>
        <PostMessageContextProvider>
          <LivesContextProvider>
            {children}
          </LivesContextProvider>
        </PostMessageContextProvider>
    </AppContextProvider>
  </>;
}

export default Contexts;
