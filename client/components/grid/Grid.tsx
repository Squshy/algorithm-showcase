import React, { useEffect, useRef, useState, useCallback } from "react";
import { Graph } from "../../classes/Graph";
import { Node } from "../../classes/Node";
import { useOnScreenResize } from "../../hooks/useOnResize";
import { SpinnerIcon } from "../../svg/Spinner";
import { GridNode } from "./GridNode";

const NODE_TO_SET = {
  START: "START",
  END: "END",
  WALL: "WALL",
  WEIGHT: "WEIGHT",
};

const PX_IN_REM = 16;

interface GridProps {}

interface GridDimensions {
  rows: number;
  cols: number;
}

interface StartEndNodes {
  start: {
    row: number;
    col: number;
  } | null;
  end: {
    row: number;
    col: number;
  } | null;
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
  const [startEndNodes, setStartEndNodes] = useState<StartEndNodes>({
    start: null,
    end: null,
  });
  const [error, setError] = useState<string | null>(null);

  const createGrid = useCallback((maxRows: number, maxCols: number) => {
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
      setError(null);
    }, 250);
  }, [width, height, createGrid]);

  const onGridNodeClick = (node: Node) => {
    const allNodes = [...nodes];
    const currentNode = allNodes[node.row][node.col];

    const startNode = startEndNodes.start
      ? allNodes[startEndNodes.start.row][startEndNodes.start.col]
      : null;
    const endNode = startEndNodes.end
      ? allNodes[startEndNodes.end.row][startEndNodes.end.col]
      : null;

    const checkStartEnd = () => {
      if (endNode === currentNode) {
        currentNode.isEnd = false;
        setStartEndNodes((prevState) => {
          return { ...prevState, end: null };
        });
      }
      if (startNode === currentNode) {
        currentNode.isStart = false;
        setStartEndNodes((prevState) => {
          return { ...prevState, start: null };
        });
      }
    };

    switch (nodeToSet) {
      case NODE_TO_SET.START:
        if (startNode) {
          startNode.isStart = false;
          startNode.distance = Infinity;
          startNode.weight = 0;
        }
        setStartEndNodes((prevState) => {
          return { ...prevState, start: { row: node.row, col: node.col } };
        });

        currentNode.isStart = true;
        currentNode.distance = 0;
        break;

      case NODE_TO_SET.END:
        if (endNode) {
          endNode.isEnd = false;
          endNode.distance = Infinity;
          endNode.weight = 0;
        }
        setStartEndNodes((prevState) => {
          return { ...prevState, end: { row: node.row, col: node.col } };
        });

        currentNode.isEnd = true;
        currentNode.distance = Infinity;
        break;

      case NODE_TO_SET.WALL:
        checkStartEnd();
        currentNode.isWall = !currentNode.isWall;
        currentNode.distance = Infinity;
        break;

      case NODE_TO_SET.WEIGHT:
        checkStartEnd();
        currentNode.isWall = false;
        currentNode.distance = Infinity;
        currentNode.weight > 0 ? currentNode.weight = 0 : currentNode.weight = 5;
        break;
    }

    setNodes(allNodes);
  };

  const resetGrid = () => {
    createGrid(gridDimensions.rows, gridDimensions.cols);
    setStartEndNodes({ start: null, end: null });
  };

  const unvisitGrid = async () => {
    const sNodes = [...nodes];
    for (let i = 0; i < gridDimensions.rows; i++) {
      for (let j = 0; j < gridDimensions.cols; j++) {
        sNodes[i][j].visited = false;
        sNodes[i][j].finalPath = false;
        sNodes[i][j].isStart
          ? (sNodes[i][j].distance = 0)
          : (sNodes[i][j].distance = Infinity);
      }
    }
    setNodes(sNodes);
  };

  const startAlgo = async () => {
    await unvisitGrid();
    if (!graph) {
      setError("Game error, please refresh.");
      return;
    }
    if (startEndNodes.start === null || startEndNodes.end === null) {
      setError("You must select a start and an end node.");
      return;
    }
    const algoNodes = graph.dijkstra(nodes);
    if (!algoNodes) {
      setError("Game error, please refresh.");
      return;
    }
    const sNodes = [...nodes];
    for (let node of algoNodes) {
      sNodes[node.row][node.col] = node;
    }
    setError(null);
    setNodes(sNodes);
    setTimeout(() => {
      animatePath(algoNodes[algoNodes.length - 1]);
    }, 500);
  };

  const animatePath = (finalNode: Node) => {
    const sNodes = [...nodes];
    let currentNode = finalNode;
    while (currentNode.previousNode !== null) {
      sNodes[currentNode.row][currentNode.col].finalPath = true;
      currentNode = currentNode.previousNode;
    }
    setNodes(sNodes);
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
        className={`w-full px-2 py-3 border-gray-800 border-2 rounded-md bg-gray-700 bg-opacity-25 space-y-4`}
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
          className={`h-4 text-red-500 text-center items-center flex justify-center`}
        >
          <p aria-label={`game error`}>{error && error}</p>
        </div>
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
              START
            </button>
            <button
              className={`p-2 bg-red-500 border-red-300 border w-24 rounded-md hover:bg-opacity-75 transition duration-150 ease-in-out mx-2`}
              onClick={() => setNodeToSet(NODE_TO_SET.END)}
            >
              END
            </button>
            <button
              className={`p-2 bg-purple-500 border-purple-300 border w-24 rounded-md hover:bg-opacity-75 transition duration-150 ease-in-out mx-2`}
              onClick={() => startAlgo()}
            >
              PLAY
            </button>

            <button
              className={`p-2 bg-black-50 border-white border w-24 rounded-md hover:bg-opacity-75 transition duration-150 ease-in-out mx-2`}
              onClick={() => setNodeToSet(NODE_TO_SET.WALL)}
            >
              WALL
            </button>

            <button
              className={`p-2 bg-pink-500 border-white border w-24 rounded-md hover:bg-opacity-75 transition duration-150 ease-in-out mx-2`}
              onClick={() => setNodeToSet(NODE_TO_SET.WEIGHT)}
            >
              WEIGHT
            </button>
            <button
              className={`p-2 bg-gray-500 border-purple-300 border w-24 rounded-md hover:bg-opacity-75 transition duration-150 ease-in-out mx-2`}
              onClick={() => resetGrid()}
            >
              RESET
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
