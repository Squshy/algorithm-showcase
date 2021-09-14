import React from "react";

interface BarProps {
  number: number;
  current: boolean;
  lookedAt: boolean;
  maxNumber: number;
  maxHeight: number;
}

export const Bar: React.FC<BarProps> = ({
  number,
  maxNumber,
  maxHeight,
  current,
  lookedAt
}) => {
  const newMaxHeight = maxHeight - 3;
  return (
    <div
      className={`w-1 flex self-end   mr-px ml-px ${
        current
          ? `bg-green-500` : lookedAt ? 'bg-red-500'
          : `bg-gradient-to-t from-blue-400 via-purple-500 to-purple-700`
      }`}
      style={{ height: newMaxHeight / (maxNumber / number) }}
    />
  );
};
