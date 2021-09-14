import React, { useContext, useState, useMemo } from "react";
import { SORTING_ALGOS } from "../constants";

const SortingContext = React.createContext<string>(SORTING_ALGOS.MAX_HEAP);
const SortingUpdateContext = React.createContext<Function>(() => {});

export const useSortingAlgo = () => {
  return useContext(SortingContext)
}

export const useSortingAlgoUpdate = () => {
  return useContext(SortingUpdateContext)
}

export const SortingProvider: React.FC = ({ children }) => {
  const [activeAlgo, setActiveAlgo] = useState<string>(SORTING_ALGOS.MAX_HEAP);
  const providerValue = useMemo(() => ({activeAlgo, setActiveAlgo}), [activeAlgo, setActiveAlgo])

  const updateActiveAlgo = (link:string) => {
    setActiveAlgo(link);
  };

  return (
    <SortingContext.Provider value={providerValue.activeAlgo}>
      <SortingUpdateContext.Provider value={updateActiveAlgo}>
        {children}
      </SortingUpdateContext.Provider>
    </SortingContext.Provider>
  );
};
