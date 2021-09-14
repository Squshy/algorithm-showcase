import { useState, useMemo } from "react";
import type { NextPage } from "next";
import { MainBody } from "../components/MainBody";
import { Dropdown } from "../components/nav/Dropdown";
import { Nav } from "../components/nav/Nav";
import { SortDisplay } from "../components/sorting/SortDisplay";
import { SIDEBAR_LINKS, SORTING_ALGOS } from "../constants";
import {
  SortingProvider,
  useSortingAlgo,
  useSortingAlgoUpdate,
} from "../contexts/SortingContext";
import { useSetLink } from "../hooks/useSetLink";
import { Heap } from "../classes/Heap";

const Sorting: NextPage = () => {
  useSetLink(SIDEBAR_LINKS.SORTING.id);
  const selectedAlgo = useSortingAlgo();
  const updateAlgo = useSortingAlgoUpdate();
  const [array, setArray] = useState<Array<number>>([5, 8, 2, 43, 67, 19, 78, 10, 13, 56, 99]);

  const heap = useMemo(() => {
    return new Heap(array);
  }, []);


  const runSort = () => {
    heap.buildMaxHeap();
    setArray(heap.items)
  };

  return (
    <SortingProvider>
      <Nav>
        <Dropdown
          data={SORTING_ALGOS}
          selected={selectedAlgo}
          onSubItemClick={updateAlgo}
        />
      </Nav>
      <MainBody>
        <SortDisplay array={array} />
        <button
          className={`w-16 h-8 bg-purple-500 rounded-md self-center mt-6 hover:bg-purple-600 transition duration-150 ease-out`}
          onClick={() => runSort()}
        >
          Start
        </button>
      </MainBody>
    </SortingProvider>
  );
};

export default Sorting;
