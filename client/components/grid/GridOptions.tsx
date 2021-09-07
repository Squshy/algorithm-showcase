import React from 'react';
import { NODE_TO_SET } from '../../constants';

interface GridOptionsProps {
  setNodeToSet: (option:string) => void;
  resetGrid: () => void;
  startAlgo: () => void;
}

export const GridOptions:React.FC<GridOptionsProps> = ({setNodeToSet, resetGrid, startAlgo}) => {
  return (
    <div
          className={`bg-gradient-to-r from-blue-500 to-purple-500 w-full p-2 rounded-md items-center justify-center shadow-sm`}
        >
          <div
            className={`flex flex-row flex-wrap -mx-2 justify-center items-center`}
          >
            <button
              className={`p-2 bg-green-500 border-green-300 border w-24 rounded-md hover:bg-opacity-75 transition duration-150 ease-in-out mx-2`}
              onClick={() => setNodeToSet(NODE_TO_SET.START)}
            >
              <span className={`sr-only`}>Start Node</span>
              START
            </button>
            <button
              className={`p-2 bg-red-500 border-red-300 border w-24 rounded-md hover:bg-opacity-75 transition duration-150 ease-in-out mx-2`}
              onClick={() => setNodeToSet(NODE_TO_SET.END)}
            >
              <span className={`sr-only`}>End Node</span>
              END
            </button>
            <button
              className={`p-2 bg-purple-500 border-purple-300 border w-24 rounded-md hover:bg-opacity-75 transition duration-150 ease-in-out mx-2`}
              onClick={() => startAlgo()}
            >
              <span className={`sr-only`}>Play Algorithm</span>
              PLAY
            </button>

            <button
              className={`p-2 bg-black-50 border-white border w-24 rounded-md hover:bg-opacity-75 transition duration-150 ease-in-out mx-2`}
              onClick={() => setNodeToSet(NODE_TO_SET.WALL)}
            >
              <span className={`sr-only`}>Wall Node</span>
              WALL
            </button>

            <button
              className={`p-2 bg-pink-500 border-white border w-24 rounded-md hover:bg-opacity-75 transition duration-150 ease-in-out mx-2`}
              onClick={() => setNodeToSet(NODE_TO_SET.WEIGHT)}
            >
              <span className={`sr-only`}>Weight Node</span>
              WEIGHT
            </button>
            <button
              className={`p-2 bg-gray-500 border-purple-300 border w-24 rounded-md hover:bg-opacity-75 transition duration-150 ease-in-out mx-2`}
              onClick={() => resetGrid()}
            >
              <span className={`sr-only`}>Reset Grid</span>
              RESET
            </button>
          </div>
        </div>
  )
}