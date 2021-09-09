import React from "react";

interface MobileButtonProps {
  onClick: () => void;
  sr: string;
}

export const MobileButton: React.FC<MobileButtonProps> = ({
  onClick,
  children,
  sr
}) => {
  return (
    <button
      className={`block lg:hidden h-10 w-10 md:h-16 md:w-16 fixed z-50 flex items-center justify-center border-white text-white bg-white bg-opacity-10 border bottom-4 right-4 rounded-full border-opacity-20 focus:outline-none focus-visible:ring backdrop-filter backdrop-blur transition duration-150 ease-in-out`}
      onClick={onClick}
    >
      <span className={`sr-only`}>{sr}</span>
      {children}
    </button>
  );
};
