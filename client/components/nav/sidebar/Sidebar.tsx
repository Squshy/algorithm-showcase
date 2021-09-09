import React from "react";
import { SIDEBAR_LINKS } from "../../../constants";
import {
  useSidebarLink,
} from "../../../contexts/SidebarContext";
import { SideLink } from "./SideLink";

interface SidebarProps {}

export const SideBar: React.FC<SidebarProps> = ({}) => {
  const activeLink = useSidebarLink();

  const displayLinks = () => {
    const links:Array<JSX.Element> = [];
    Object.entries(SIDEBAR_LINKS).map((link, i) => {
      const obj = link[1];
      links.push(<SideLink active={obj.id === activeLink} href={obj.href} text={obj.text} key={i}/>)
    })
    return links
  }

  return (
    <div className={`flex-shrink-0 hidden w-64 lg:block lg:pr-8`}>
      <div
        className={`transition duration-150 ease-in-out sticky top-105 border-gray-800 p-6 rounded-md border bg-black-25 hover:bg-black-50 flex flex-col`}
      >
        {displayLinks()}
      </div>
    </div>
  );
};
