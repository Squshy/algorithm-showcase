import React, { useContext, useState, useMemo } from "react";
import { PATHFINDING_ALGOS } from "../constants";

const PathfindingContext = React.createContext<string>(PATHFINDING_ALGOS.DIJKSTRA);
const PathfindingUpdateContext = React.createContext<Function>(() => {});

export const usePathfindingAlgo = () => {
  return useContext(PathfindingContext)
}

export const usePathfindingAlgoUpdate = () => {
  return useContext(PathfindingUpdateContext)
}

export const PathfindingProvider: React.FC = ({ children }) => {
  const [activeAlgo, setActiveAlgo] = useState<string>(PATHFINDING_ALGOS.DIJKSTRA);
  const providerValue = useMemo(() => ({activeAlgo, setActiveAlgo}), [activeAlgo, setActiveAlgo])

  const updateActiveAlgo = (link:string) => {
    setActiveAlgo(link);
  };

  return (
    <PathfindingContext.Provider value={providerValue.activeAlgo}>
      <PathfindingUpdateContext.Provider value={updateActiveAlgo}>
        {children}
      </PathfindingUpdateContext.Provider>
    </PathfindingContext.Provider>
  );
};
