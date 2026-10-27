import { useCallback } from "react";
import { useAppNavigation } from "./useAppNavigation";
import usePostMessage from "./usePostMessage";
import { isExternalHref, mapSiteHref } from "../utils/siteRoutes";

/**
 * Navega a partir de um href vindo de componente do site: externo abre pelo
 * app nativo (ou nova aba), interno passa pelo useAppNavigation (histórico,
 * loading e aviso ao nativo) depois de traduzido para as rotas do app.
 */
const useSiteNavigation = () => {
  const { goTo } = useAppNavigation();
  const { openLink } = usePostMessage();

  return useCallback(
    (href: string) => {
      if (/^https?:/.test(href)) {
        openLink(href);
        return;
      }
      if (isExternalHref(href)) {
        window.location.href = href;
        return;
      }
      const [pathname, search] = mapSiteHref(href).split("?");
      const query = search ? Object.fromEntries(new URLSearchParams(search)) : undefined;
      goTo({ pathname, query });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [goTo, openLink],
  );
};

export default useSiteNavigation;
