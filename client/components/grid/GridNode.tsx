import React from "react";
import { Node } from "../../classes/Node";

interface GridNodeProps {
  node: Node;
  endRow: boolean;
  endCol: boolean;
  handleClick: (node: Node) => void;
}

export const GridNode: React.FC<GridNodeProps> = ({
  node,
  endRow,
  endCol,
  handleClick,
}) => {
  return (
    <div
      onClick={() => handleClick(node)}
      className={`h-4 w-4 border-gray-900 border bg-black-50 ${
        node.row === 0 && "border-t-2"
      } ${endRow && "border-b-2"} ${endCol && "border-r-2"} ${
        node.col === 0 && "border-l-2"
      }
      ${(node.visited && node.isStart === false && node.isEnd === false) && "bg-purple-900 animate-visited-node"}
      ${node.isStart && "bg-green-500"}
      ${node.isEnd && "bg-red-500"}
      transform duration-150 ease-in-out hover:scale-125 hover:bg-gray-800 hover:border-2 hover:border-gray-400 hover:z-50`}
    ></div>
  );
};
