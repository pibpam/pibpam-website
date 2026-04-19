import React, {
  createContext,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";
import { useAppNavigation } from "../hooks/useAppNavigation";
import usePostMessage from "../hooks/usePostMessage";
import { useRouter } from "next/router";
import { ApiLocal } from "../services/apiLocal";
import { set } from "date-fns";

interface Context {
  isLoadingDownload: boolean;
  setLoadingDownload: (data: boolean) => void;
  deviceInfo: DeviceInfo | null;
  blockPostMessage: () => void;
  unblockPostMessage: () => void;
}

export const PostMessageContext = createContext<Context>({} as Context);

export interface IChildren {
  children: ReactElement;
}

enum EActions {
  GOBACK = "goBack",
  LINKING = "linking",
  EXPO_TOKEN = "expoToken",
  NOTIFICATION = "notification",
  IMAGE_SAVED = "imageSaved",
  ERROR_IMAGE_SAVE = "errorImageSave",
  DEVICE_INFO = "deviceInfo",
}

interface DataLink {
  route: string;
  params: Record<string, string>;
}

interface DeviceInfo {
  bottom: number;
  top: number;
  left: number;
  right: number;
  platform: "ios" | "android";
}

interface INotification {
  notification?: {
    request?: {
      content?: {
        data?: {
          route?: string;
          params?: Record<string, string>;
        };
      };
    };
  };
}

export const PostMessageContextProvider: React.FC<IChildren> = ({
  children,
}: IChildren) => {
  const started = useRef(false);
  const { goBack, goTo } = useAppNavigation();
  const { sendMessage } = usePostMessage();
  const [isLoadingDownload, setLoadingDownload] = useState(false);

  const [action, setAction] = useState("");
  const [dataLink, setDataLink] = useState<DataLink>({} as DataLink);
  const [expoToken, setExpoToken] = useState("");
  const [notification, setNotification] = useState<INotification>(
    {} as INotification,
  );
  const { query } = useRouter();
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);

  useEffect(() => {

    alert(action);

    if (action === EActions.GOBACK) {
      goBack({}).then();
      setAction("");
    }

    if (action === EActions.LINKING) {
      const route = dataLink.route ? `/${dataLink.route}` : "/";
      const searchParams = new URLSearchParams(dataLink.params).toString();

      alert(JSON.stringify({ route, searchParams, dataLink }));

      // {"pibpam":{"action":"linking","route":"","params":{"route":"auth/code","token":" sfsfdsfsdfs"}}}

      goTo({
        pathname: `${route}?${searchParams}`,
        showLoading: true,
        query: { ...query, from: "linking" } as Record<string, string>,
      }).then();
      setAction("");
      setDataLink({} as DataLink);
    }

    if (action === EActions.EXPO_TOKEN) {
      const api = new ApiLocal();
      if (expoToken) {
        api.savePushToken(expoToken);
      }
      setAction("");
    }

    if (action === EActions.NOTIFICATION) {
      const notifiationData =
        notification?.notification?.request?.content?.data;

      if (notifiationData?.route) {
        goTo({
          pathname: `/${notifiationData.route}`,
          showLoading: true,
          query: { ...query, from: "push" } as Record<string, string>,
        }).then();
      }

      setAction("");
      setNotification({} as INotification);
    }

    // eslint-disable-next-line
  }, [action]);

  const handleEventPostMessage = (event: MessageEvent) => {
    if (
      [
        "http://localhost:3000",
        "https://pibpam-website.vercel.app",
        "https://pibpam.org",
        "https://www.pibpam.org",
        "https://pibpam.firebaseapp.com",
        "http://10.0.2.2:3000",
      ].includes(event.origin)
    ) {
      return;
    }

    const data = JSON.parse(event.data);

    if (!data.pibpam || !data.pibpam.action) {
      return;
    }

    if (
      data.pibpam.action === EActions.ERROR_IMAGE_SAVE ||
      data.pibpam.action === EActions.IMAGE_SAVED
    ) {
      setLoadingDownload(false);
      return;
    }

    if (data.pibpam.action === EActions.GOBACK) {
      setAction(EActions.GOBACK);
    }

    if (data.pibpam.action === EActions.EXPO_TOKEN) {
      setExpoToken(data.pibpam.token);
      setAction(EActions.EXPO_TOKEN);
    }

    if (data.pibpam.action === EActions.DEVICE_INFO) {
      setAction(EActions.DEVICE_INFO);
      setDeviceInfo(data.pibpam);
    }

    if (data.pibpam.action === EActions.NOTIFICATION) {
      setNotification(data.pibpam.notification);
      setAction(EActions.NOTIFICATION);
    }

    if (data.pibpam.action === EActions.LINKING && data.pibpam?.params?.route) {
      setDataLink({
        route: data.pibpam.params.route,
        params: data.pibpam.params,
      });

      setAction(EActions.LINKING);
    }
  };

  const init = () => {
    if (started.current) {
      return;
    }
    started.current = true;
    window.addEventListener("message", handleEventPostMessage);
    // @ts-ignore
    document.addEventListener("message", handleEventPostMessage);
    setTimeout(() => {
      sendMessage({ action: "ok" });
    }, 1000);
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line
  }, []);

  const blockPostMessage = () => {
    window.removeEventListener("message", handleEventPostMessage);
    // @ts-ignore
    document.removeEventListener("message", handleEventPostMessage);
  };

  const unblockPostMessage = () => {
    window.addEventListener("message", handleEventPostMessage);
    // @ts-ignore
    document.addEventListener("message", handleEventPostMessage);
  };

  return (
    <PostMessageContext.Provider
      value={{
        isLoadingDownload,
        setLoadingDownload,
        deviceInfo,
        blockPostMessage,
        unblockPostMessage,
      }}
    >
      {children}
    </PostMessageContext.Provider>
  );
};
