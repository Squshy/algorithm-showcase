import React, { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { Graph } from "../../classes/Graph";
import { Node } from "../../classes/Node";
import { useOnScreenResize } from "../../hooks/useOnResize";
import { SpinnerIcon } from "../../svg/Spinner";
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
  const [loadingGrid, setLoadingGrid] = useState<boolean>(true);
  const [graph, setGraph] = useState<Graph | undefined>();

  useEffect(() => {
    setLoadingGrid(true)
    setTimeout(() => {
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
      setLoadingGrid(false);
    }, 250);
  }, [width, height]);

  const createGrid = () => {
    // const nodes: Array<JSX.Element> = [];
    const newGraph = new Graph(gridDimensions.rows, gridDimensions.cols);

    for (let i = 0; i < gridDimensions.rows; i++) {
      for (let j = 0; j < gridDimensions.cols; j++) {
        const newNode = new Node(i, j);
        newGraph.addVertex(newNode)
      }
    }

    setGraph(newGraph);
    // return nodes;
  };

  return (
    <div
      className={`w-full px-2 py-3 border-gray-800 border-2 rounded-md bg-gray-700 bg-opacity-25`}
    >
      <div
        className={`w-full flex flex-wrap h-96 justify-center`}
        ref={gridRef}
      >
        {/* {loadingGrid ? <SpinnerIcon className={`h-12 w-12 text-gray-600 self-center`} /> : createGrid()} */}
      </div>
    </div>
  );
};
