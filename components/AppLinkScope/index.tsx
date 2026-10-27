import React, { MouseEvent, ReactNode } from "react";
import useSiteNavigation from "../../hooks/useSiteNavigation";

interface IAppLinkScope {
  children: ReactNode;
}

/**
 * Fronteira para componentes importados do site: intercepta o clique em
 * qualquer <a href> dentro dela e navega pelo app (veja useSiteNavigation) em
 * vez de deixar o next/link do site trocar de página por conta própria.
 * Não gera layout (`display: contents`).
 */
const AppLinkScope: React.FC<IAppLinkScope> = ({ children }) => {
  const navigate = useSiteNavigation();

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) {
      return;
    }
    const anchor = (event.target as Element).closest("a[href]");
    if (!anchor) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    navigate(anchor.getAttribute("href") as string);
  };

  return (
    <div style={{ display: "contents" }} onClickCapture={handleClick}>
      {children}
    </div>
  );
};

export default AppLinkScope;
