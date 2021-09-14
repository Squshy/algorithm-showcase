import React, { Fragment } from "react";
import { Transition } from "@headlessui/react";

export const FadeIn: React.FC = ({ children }) => {
  return (
    <Transition
      as={Fragment}
      appear={true}
      show={true}
      enter="transition-opacity ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      {children}
    </Transition>
  );
};
