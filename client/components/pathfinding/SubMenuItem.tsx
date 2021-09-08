import React from "react";
import { Menu } from "@headlessui/react";

interface SubMenuItemProps {
  name: string;
  onClick: () => void;
}

export const SubMenuItem: React.FC<SubMenuItemProps> = ({ name, onClick }) => {
  return (
    <div className="px-2 py-2" onClick={onClick}>
      <Menu.Item>
        {({ active }) => (
          <button
            className={`${
              active ? "bg-black-25 text-white" : "text-gray-400"
            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
          >
            {name}
          </button>
        )}
      </Menu.Item>
    </div>
  );
};
