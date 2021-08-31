import React from "react";

interface SidebarProps {}

export const SideBar: React.FC<SidebarProps> = ({}) => {
  return (
    <div className={`flex-shrink-0 hidden w-64 lg:block lg:pr-8`}>
      <div className={`transition duration-150 ease-in-out sticky top-105 border-gray-800 p-6 rounded-md border bg-black bg-opacity-25 hover:bg-opacity-50`}><p>SIDEBAR</p></div>
    </div>
  );
};
