import React, { useContext, useState, useMemo } from "react";
import { SORTING_ALGOS } from "../constants";

const SortingContext = React.createContext<string>(SORTING_ALGOS.HEAP);
const SortingUpdateContext = React.createContext<Function>(() => {});

export const useSortingSort = () => {
  return useContext(SortingContext)
}

export const useSortingSortUpdate = () => {
  return useContext(SortingUpdateContext)
}

export const SortingProvider: React.FC = ({ children }) => {
  const [activeSort, setActiveSort] = useState<string>(SORTING_ALGOS.HEAP);
  const providerValue = useMemo(() => ({activeSort, setActiveSort}), [activeSort, setActiveSort])

  const updateActiveSort = (link:string) => {
    setActiveSort(link);
  };

  return (
    <SortingContext.Provider value={providerValue.activeSort}>
      <SortingUpdateContext.Provider value={updateActiveSort}>
        {children}
      </SortingUpdateContext.Provider>
    </SortingContext.Provider>
  );
};
