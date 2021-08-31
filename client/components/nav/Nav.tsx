import React from "react";
import { LightningBoltIcon } from "@heroicons/react/solid";

interface NavProps {}

export const Nav: React.FC<NavProps> = ({}) => {
  return (
    <header
      className={`sticky top-0 z-50 bg-opacity-50 h-24 bg-gray-900 backdrop-filter backdrop-blur`}
    >
      <div className={`max-w-8xl mx-auto xl:px-8`}>
        <div
          className={`flex items-center justify-between px-4 py-5 border-b lg:px-8 sm:px-6 xl:px-0 border-gray-800`}
        >
          <div className={`flex flex-row space-x-2 items-center`}>
            <div
              className={` bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-2`}
            >
              <LightningBoltIcon className={`h-6 w-6`} />
            </div>
            <p className={`font-extralight text-2xl`}>ALGORITHMS</p>
          </div>
          <div>ME</div>
        </div>
      </div>
    </header>
  );
};
