import React from "react";
import { NODE_TO_SET } from "../../constants";
import { OptionButton } from "./OptionButton";

interface GridOptionsProps {
  setNodeToSet: (option: string) => void;
  resetGrid: () => void;
  startAlgo: () => void;
}

export const GridOptions: React.FC<GridOptionsProps> = ({
  setNodeToSet,
  resetGrid,
  startAlgo,
}) => {
  return (
    <div
      className={`bg-gradient-to-r from-blue-500 to-purple-500 w-full p-2 rounded-md items-center justify-center shadow-sm`}
    >
      <div
        className={`flex flex-col justify-center md:flex-row flex-wrap md:justify-between items-center p-2`}
      >
        <fieldset className="border border-solid border-white p-1 rounded-md text-center text-sm  md:-m-2 flex bg-opacity-10 shadow-sm bg-white flex-wrap items-center justify-evenly w-full md:w-auto">
          <legend>NODES</legend>
          <OptionButton
            text={NODE_TO_SET.START}
            sr="Start node"
            onClick={() => setNodeToSet(NODE_TO_SET.START)}
          />
          <OptionButton
            text={NODE_TO_SET.END}
            sr="End node"
            onClick={() => setNodeToSet(NODE_TO_SET.END)}
          />
          <OptionButton
            text={NODE_TO_SET.WALL}
            sr="Wall node"
            onClick={() => setNodeToSet(NODE_TO_SET.WALL)}
          />
          <OptionButton
            text={NODE_TO_SET.WEIGHT}
            sr="Weight node"
            onClick={() => setNodeToSet(NODE_TO_SET.WEIGHT)}
          />
        </fieldset>

        <div className={`flex justify-evenly  w-full md:w-auto pt-4 md:p-0`}>
          <OptionButton text="PLAY" onClick={() => startAlgo()} sr="Play the algorithm" diff/>
          <OptionButton text="RESET" onClick={() => resetGrid()} sr="Reset the grid" diff/>
        </div>
      </div>
    </div>
  );
};
