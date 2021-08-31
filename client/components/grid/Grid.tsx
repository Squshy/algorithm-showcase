import React, { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useOnScreenResize } from "../../hooks/useOnResize";
import { GridNode } from "./GridNode";

const PX_IN_REM = 16;

interface GridProps {}

interface GridDimensions {
  rows: number;
  cols: number;
}

export const Grid: React.FC<GridProps> = ({}) => {
  const { width, height } = useOnScreenResize();
  const [gridDimensions, setGridDimensions] = useState<GridDimensions>({
    rows: 0,
    cols: 0,
  });
  const gridRef: any = useRef<HTMLDivElement>();

  useEffect(() => {
    const newGird: GridDimensions = {
      rows: 5,
      cols: 0,
    };
    if (gridRef.current) {
      newGird.cols = Math.floor(
        gridRef.current.getBoundingClientRect().width / PX_IN_REM
      );
      newGird.rows = Math.floor(
        gridRef.current.getBoundingClientRect().height / PX_IN_REM
      );
    }
    setGridDimensions(newGird);
  }, [width, height]);

  const createGrid = (): Array<JSX.Element> => {
    const nodes: Array<JSX.Element> = [];

    for (let i = 0; i < gridDimensions.rows; i++) {
      for (let j = 0; j < gridDimensions.cols; j++) {
        nodes.push(
          <GridNode
            key={`${i}-${j}`}
            row={i}
            col={j}
            endRow={i === gridDimensions.rows - 1}
            endCol={j === gridDimensions.cols - 1}
          />
        );
      }
    }

    return nodes;
  };

  return (
    <div className={`w-full px-2 py-3 border-gray-800 border-2 rounded-md bg-gray-700 bg-opacity-25`}>
      <div
        className={`w-full flex flex-wrap h-64 justify-center`}
        ref={gridRef}
      >
        {createGrid()}
      </div>
    </div>
  );
};
