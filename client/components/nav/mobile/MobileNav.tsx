import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Transition } from "@headlessui/react";
import { SIDEBAR_LINKS } from "../../../constants";
import { useSidebarLink } from "../../../contexts/SidebarContext";
import { MobileLink } from "./MobileLink";
import { MobileButton } from "./MobileButton";
import { XIcon } from "@heroicons/react/outline";
import { MenuIcon } from "@heroicons/react/outline";

interface MobileNavProps {}

export const MobileNav: React.FC<MobileNavProps> = ({}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const activeLink = useSidebarLink();

  const displayLinks = () => {
    const links: Array<JSX.Element> = [];
    Object.entries(SIDEBAR_LINKS).map((link, i) => {
      const obj = link[1];
      links.push(
        <MobileLink
          active={obj.id === activeLink}
          href={obj.href}
          text={obj.text}
          onClick={() => setIsOpen(false)}
          key={i}
        />
      );
    });
    return links;
  };

  return (
    <>
      <MobileButton onClick={() => setIsOpen(true)} sr="Open site navigation">
        <MenuIcon className={`h-6 w-6`} />
      </MobileButton>
      <Transition show={isOpen}>
        <Dialog
          onClose={() => setIsOpen(false)}
          className="fixed inset-0 z-40 overflow-hidden lg:hidden"
        >
          <Transition.Child
            enter="transition-opacity ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className={`absolute inset-0 backdrop-filter backdrop-blur`}
          >
            <Dialog.Overlay
              className={`bg-gray-900 absolute inset-0 backdrop-filter backdrop-blur bg-opacity-50`}
            />
          </Transition.Child>

          <Transition.Child
            enter="transition ease-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
            className={`absolute inset-0 z-40 flex pointer-events-none`}
          >
            <div
              className={`bg-gray-900 bg-opacity-90 h-full flex w-1/2 md:w-1/3 border-gray-700 border-r flex flex-col space-y-4 pointer-events-auto`}
            >
              <div className={`px-6 py-6 border-b border-gray-700`}>
                <h1 className={`text-lg font-semibold`}>Links</h1>
              </div>
              {displayLinks()}
            </div>
          </Transition.Child>
        </Dialog>
        <Transition.Child
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <MobileButton
            onClick={() => setIsOpen(false)}
            sr="Close site naviagtion"
          >
            <XIcon className={`h-6 w-6`} />
          </MobileButton>
        </Transition.Child>
      </Transition>
    </>
  );
};
