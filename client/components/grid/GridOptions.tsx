import React from "react";
import { NODE_TO_SET } from "../../constants";

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
        className={`flex flex-row flex-wrap justify-between items-center p-2`}
      >
        <fieldset className="border border-solid border-white p-1 rounded-md text-center text-sm -m-2 flex bg-opacity-10 shadow-sm bg-white flex-wrap items-center justify-evenly w-full md:w-auto">
          <legend>NODES</legend>
          <button
            className={`p-2 bg-green-500 border-green-300 border w-1/3 sm:w-24 rounded-md hover:bg-opacity-75 transition duration-150 ease-in-out m-2 transform hover:scale-105`}
            onClick={() => setNodeToSet(NODE_TO_SET.START)}
          >
            <span className={`sr-only`}>Start Node</span>
            START
          </button>
          <button
            className={`p-2 bg-red-500 border-red-300 border w-1/3 sm:w-24 rounded-md hover:bg-opacity-75 transition duration-150 ease-in-out m-2 transform hover:scale-105`}
            onClick={() => setNodeToSet(NODE_TO_SET.END)}
          >
            <span className={`sr-only`}>End Node</span>
            END
          </button>
          <button
            className={`p-2 bg-yellow-500 border-white border w-1/3 sm:w-24 rounded-md hover:bg-opacity-75 transition duration-150 ease-in-out m-2 transform hover:scale-105`}
            onClick={() => setNodeToSet(NODE_TO_SET.WALL)}
          >
            <span className={`sr-only`}>Wall Node</span>
            WALL
          </button>

          <button
            className={`p-2 bg-pink-500 border-white border w-1/3 sm:w-24 rounded-md hover:bg-opacity-75 transition duration-150 ease-in-out m-2 transform hover:scale-105`}
            onClick={() => setNodeToSet(NODE_TO_SET.WEIGHT)}
          >
            <span className={`sr-only`}>Weight Node</span>
            WEIGHT
          </button>
        </fieldset>

        <div className={`flex justify-evenly  w-full md:w-auto pt-4 md:p-0`}>
          <button
            className={`p-2 bg-blue-500 border-blue-300 border w-24 rounded-md hover:bg-opacity-75 transition duration-150 ease-in-out m-2 transform hover:scale-105`}
            onClick={() => startAlgo()}
          >
            <span className={`sr-only`}>Play Algorithm</span>
            PLAY
          </button>

          <button
            className={`p-2 bg-purple-500 border-purple-300 border w-24 rounded-md hover:bg-opacity-75 transition duration-150 ease-in-out m-2 transform hover:scale-105`}
            onClick={() => resetGrid()}
          >
            <span className={`sr-only`}>Reset Grid</span>
            RESET
          </button>
        </div>
      </div>
    </div>
  );
};
