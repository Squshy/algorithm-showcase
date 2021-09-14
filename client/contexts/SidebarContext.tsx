import React, { useContext, useState, useMemo } from "react";
import { SIDEBAR_LINKS } from "../constants";

const SidebarContext = React.createContext<string | null>(null);
const SidebarUpdateContext = React.createContext<Function>(() => {});

export const useSidebarLink = () => {
  return useContext(SidebarContext)
}

export const useSidebarUpdateLink = () => {
  return useContext(SidebarUpdateContext)
}

export const SidebarProvider: React.FC = ({ children }) => {
  const [activeLink, setActiveLink] = useState<string>(SIDEBAR_LINKS.HOME.text);
  const providerValue = useMemo(() => ({activeLink, setActiveLink}), [activeLink, setActiveLink])

  const updateActiveLink = (link:string) => {
    setActiveLink(link);
  };

  return (
    <SidebarContext.Provider value={providerValue.activeLink}>
      <SidebarUpdateContext.Provider value={updateActiveLink}>
        {children}
      </SidebarUpdateContext.Provider>
    </SidebarContext.Provider>
  );
};
