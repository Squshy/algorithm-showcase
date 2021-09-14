import React, { useEffect, useRef, useState, useCallback } from "react";
import { Graph } from "../../classes/Graph";
import { Node } from "../../classes/Node";
import { NODE_TO_SET, PATHFINDING_ALGOS, PX_IN_REM } from "../../constants";
import { usePathfindingAlgo } from "../../contexts/PathfindingContext";
import { useOnScreenResize } from "../../hooks/useOnResize";
import { SpinnerIcon } from "../../svg/Spinner";
import { GridNode } from "./GridNode";
import { GridOptions } from "./GridOptions";

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
  const selectedAlgo = usePathfindingAlgo();

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
        currentNode.weight > 0
          ? (currentNode.weight = 0)
          : (currentNode.weight = 5);
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

  const preGameErrors = () => {
    if (!graph) {
      setError("Game error, please refresh.");
      return false;
    }
    if (startEndNodes.start === null || startEndNodes.end === null) {
      setError("You must select a start and an end node.");
      return false;
    }
    return true;
  };

  const selectAlgo = () => {
    if (selectedAlgo === PATHFINDING_ALGOS.DIJKSTRA) {
      return graph!.dijkstra(nodes);
    }

    // default return dijkstra
    return graph!.dijkstra(nodes);
  };

  const startAlgo = async () => {
    await unvisitGrid();
    if (!preGameErrors()) return;

    const algoNodes = selectAlgo();

    if (algoNodes === null) {
      setError("Game error, try changing some nodes.");
      unvisitGrid();
    } else {
      const sNodes = [...nodes];
      for (let node of algoNodes) {
        sNodes[node.row][node.col] = node;
      }
      setError(null);
      setNodes(sNodes);
      setTimeout(() => {
        animatePath(algoNodes[algoNodes.length - 1]);
      }, 500);
    }
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
        <GridOptions
          startAlgo={startAlgo}
          resetGrid={resetGrid}
          setNodeToSet={setNodeToSet}
        />
      </div>
    </>
  );
};
