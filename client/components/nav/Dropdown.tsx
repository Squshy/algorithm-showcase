import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { DropdownItem } from "./DropdownItem";

interface DropdownProps {
  data: Object;
  selected: string;
  onSubItemClick: Function;
}

export const Dropdown: React.FC<DropdownProps> = ({data, selected,onSubItemClick}) => {

  return (
    <div className={`w-32 md:w-48 h-8`}>
      <Menu as="div" className={`relative inline-block text-left w-full`}>
        <div>
          <Menu.Button className="inline-flex justify-between w-full px-4 py-2 text-sm font-medium text-white bg-black-25 border-gray-800 border rounded-md hover:bg-black-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 transition duration-150 ease-in-out">
            {selected}
            <ChevronDownIcon
              className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 w-48 mt-2 origin-top-right bg-black-50 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none font-medium text-sm">
           {
             Object.entries(data).map((item, i) => {
               return <DropdownItem name={item[1]} key={i} onClick={() => onSubItemClick(item[1])}/>
             })
           } 
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};