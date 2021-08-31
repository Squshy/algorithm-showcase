import React from "react";

interface GridNodeProps {
  row: number;
  col: number;
  endRow: boolean;
  endCol: boolean;
}

export const GridNode: React.FC<GridNodeProps> = ({
  col,
  row,
  endRow,
  endCol,
}) => {
  return (
    <div
      className={`h-4 w-4 border-gray-600 border bg-gray-800 ${
        row === 0 && "border-t-2"
      } ${endRow && "border-b-2"} ${endCol && "border-r-2"} ${
        col === 0 && "border-l-2"
      }
      transform duration-150 ease-in-out hover:scale-125 hover:bg-gray-900 hover:border-2 hover:border-gray-400 hover:z-50`}
    ></div>
  );
};
