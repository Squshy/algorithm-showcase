import React from "react";

interface BarProps {
  number: number;
  maxNumber: number;
  maxHeight: number;
}

export const Bar: React.FC<BarProps> = ({ number, maxNumber, maxHeight }) => {
  const newMaxHeight = maxHeight - 3
  return (
    <div
      className={`w-1 flex self-end bg-gradient-to-t from-blue-400 via-purple-500 to-purple-700  mr-px ml-px`}
      style={{ height: newMaxHeight / (maxNumber / number) }}
    />
  );
};
