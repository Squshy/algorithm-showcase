import React, { useEffect, useRef, useState, useCallback } from "react";
import { Graph } from "../../classes/Graph";
import { Node } from "../../classes/Node";
import {
  useNodeContext,
  useNodeUpdateContext,
} from "../../contexts/NodeContext";
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
  const [graph, setGraph] = useState<Graph>();
  const [nodes, setNodes] = useState<Array<Array<Node>>>([[]]);

  const createGrid = useCallback((maxRows, maxCols) => {
    setLoadingGrid(true);
    const newGraph = new Graph(maxRows, maxCols);
    const allNodes: Array<Array<Node>> = [];

    for (let i = 0; i < maxRows; i++) {
      const currentRow: Array<Node> = [];
      for (let j = 0; j < maxCols; j++) {
        const newNode = new Node(i, j);
        newGraph.addVertex(newNode);
        currentRow.push(newNode);
      }
      console.log("Current Row:", currentRow);
      allNodes.push(currentRow);
    }

    // Add all neighbours to the nodes
    for (let i = 0; i < maxRows; i++) {
      for (let j = 0; j < maxCols; j++) {
        newGraph.addNeighbouringEdgesToNode(allNodes[i][j], allNodes, i, j);
      }
    }
    console.log("All Nodes:", allNodes);
    setGraph(newGraph);
    setNodes(allNodes);
    setLoadingGrid(false);
  }, []);

  useEffect(() => {
    const newGrid: GridDimensions = {
      rows: 5,
      cols: 0,
    };
    if (gridRef.current) {
      newGrid.cols = Math.floor(
        gridRef.current.getBoundingClientRect().width / PX_IN_REM
      );
      newGrid.rows = Math.floor(
        gridRef.current.getBoundingClientRect().height / PX_IN_REM
      );
    }

    createGrid(newGrid.rows, newGrid.cols);
    setGridDimensions(newGrid);
  }, [width, height, createGrid]);

  const displayGrid = () => {
    return nodes?.map((row, i) => {
      return row.map((col, j) => {
        return (
          <GridNode
            key={`${row} ${col}`}
            row={nodes[i][j].row}
            col={nodes[i][j].col}
            endCol={nodes[i][j].col === gridDimensions.cols - 1}
            endRow={nodes[i][j].row === gridDimensions.rows - 1}
          />
        );
      });
    });
  };

  return (
    <div
      className={`w-full px-2 py-3 border-gray-800 border-2 rounded-md bg-gray-700 bg-opacity-25`}
    >
      <div
        className={`w-full flex flex-wrap h-96 justify-center`}
        ref={gridRef}
      >
        {loadingGrid ? (
          <SpinnerIcon className={`h-12 w-12 text-gray-600 self-center`} />
        ) : (
          displayGrid()
        )}
      </div>
    </div>
  );
};
