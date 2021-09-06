import React, { useEffect, useRef, useState, useCallback } from "react";
import { Graph } from "../../classes/Graph";
import { Node } from "../../classes/Node";
import { useOnScreenResize } from "../../hooks/useOnResize";
import { SpinnerIcon } from "../../svg/Spinner";
import { flatted2DArray } from "../../utils";
import { GridNode } from "./GridNode";

const NODE_TO_SET = {
  START: "START",
  END: "END",
};

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
  const [nodeToSet, setNodeToSet] = useState(NODE_TO_SET.START);

  const createGrid = useCallback((maxRows, maxCols) => {
    const newGraph = new Graph(maxRows, maxCols);
    const allNodes: Array<Array<Node>> = [];

    for (let i = 0; i < maxRows; i++) {
      const currentRow: Array<Node> = [];
      for (let j = 0; j < maxCols; j++) {
        const newNode = new Node(i, j);
        newGraph.addVertex(newNode);
        currentRow.push(newNode);
      }
      allNodes.push(currentRow);
    }

    // Add all neighbours to the nodes
    for (let i = 0; i < maxRows; i++) {
      for (let j = 0; j < maxCols; j++) {
        newGraph.addNeighbouringEdgesToNode(allNodes[i][j], allNodes, i, j);
      }
    }
    setGraph(newGraph);
    setNodes(allNodes);
  }, []);

  useEffect(() => {
    setLoadingGrid(true);
    setTimeout(() => {
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
      setLoadingGrid(false);
    }, 250);
  }, [width, height, createGrid]);

  const onGridNodeClick = (node: Node) => {
    const allNodes = [...nodes];
    const currentNode = allNodes[node.row][node.col];
    switch (nodeToSet) {
      case NODE_TO_SET.START:
        currentNode.isStart = true;
        currentNode.distance = 0;
        break;
      case NODE_TO_SET.END:
        currentNode.isEnd = true;
        currentNode.distance = Infinity;
        break;
    }
    setNodes(allNodes);
  };

  const startAlgo = () => {
    const algoNodes = graph!.dijkstra(nodes)
    const newNodes = [...nodes]
    for(let node of algoNodes!) {
      newNodes[node.row][node.col].visited = true;
    }
    setNodes(newNodes)
  };

  const displayGrid = () => {
    return nodes?.map((row, i) => {
      return row.map((col, j) => {
        return (
          <GridNode
            key={`${row} ${col}`}
            node={nodes[i][j]}
            endCol={nodes[i][j].col === gridDimensions.cols - 1}
            endRow={nodes[i][j].row === gridDimensions.rows - 1}
            handleClick={onGridNodeClick}
          />
        );
      });
    });
  };

  return (
    <>
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
        <div
          className={`mt-5 bg-gradient-to-r from-blue-500 to-purple-500 w-full p-2 flex flex-row rounded-md items-center justify-center space-x-4 shadow-sm`}
        >
          <button
            className={`p-2 bg-green-500 border-green-300 border w-24 rounded-md hover:bg-opacity-75 transition duration-150 ease-in-out`}
            onClick={() => setNodeToSet(NODE_TO_SET.START)}
          >
            START
          </button>
          <button
            className={`p-2 bg-red-500 border-red-300 border w-24 rounded-md hover:bg-opacity-75 transition duration-150 ease-in-out`}
            onClick={() => setNodeToSet(NODE_TO_SET.END)}
          >
            END
          </button>
          <button
            className={`p-2 bg-purple-500 border-purple-300 border w-24 rounded-md hover:bg-opacity-75 transition duration-150 ease-in-out`}
            onClick={() => startAlgo()}
          >
            PLAY
          </button>
        </div>
      </div>
    </>
  );
};
