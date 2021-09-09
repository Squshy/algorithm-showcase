import React from "react";
import { SideBar } from "./nav/sidebar/Sidebar";

export const MainBody: React.FC = ({ children }) => {
  return (
    <div className={`flex px-4 mx-auto max-w-8xl sm:px-6 lg:px-8 pt-8`}>
      <SideBar />
      <main className={`flex flex-1 min-w-0`}>
        <div className={`flex flex-1 min-w-0 max-w-6xl mx-auto px-2`}>
          <div className={`flex flex-col w-full`}>{children}</div>
        </div>
      </main>
    </div>
  );
};
