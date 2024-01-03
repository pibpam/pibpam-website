import React from "react";
import { IChildren, LoadingContextProvider } from "./loading";
import { LivesContextProvider } from "./lives";
import { PostMessageContextProvider } from "./postMessage";
import { AppContextProvider } from "./app";
import { NoticesContextProvider } from "./notices";
import { UserContextProvider } from "./user";

const Contexts: React.FC<IChildren> = ({ children }: IChildren) => {
  return <>
    <AppContextProvider>
      <LoadingContextProvider>
        <UserContextProvider>
          <PostMessageContextProvider>
            <LivesContextProvider>
              <NoticesContextProvider>
                {children}
              </NoticesContextProvider>
            </LivesContextProvider>
          </PostMessageContextProvider>
        </UserContextProvider>
      </LoadingContextProvider>
    </AppContextProvider>
  </>;
}

export default Contexts;
