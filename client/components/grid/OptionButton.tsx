import React from "react";

interface OptionButtonprops {
  onClick: () => void;
  text: string;
  sr: string;
  diff?: boolean;
}

export const OptionButton: React.FC<OptionButtonprops> = ({
  onClick,
  text,
  sr,
  diff
}) => {
  return (
    <button
      className={`p-2 ${diff ? 'bg-gradient-to-t from-purple-600 via-purple-700 to-purple-600 border-purple-400' : 'bg-gradient-to-t from-blue-500 to-indigo-600 border-blue-300'} border ${diff ? 'w-1/2' : 'w-1/3'} sm:w-24 rounded-md hover:bg-opacity-75 transition duration-150 ease-in-out m-2 transform hover:scale-105`}
      onClick={onClick}
    >
      <span className={`sr-only`}>{sr}</span>
      {text}
    </button>
  );
};
