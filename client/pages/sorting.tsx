import { useState, useMemo, useEffect, useRef } from "react";
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
import { useOnScreenResize } from "../hooks/useOnResize";

const Sorting: NextPage = () => {
  useSetLink(SIDEBAR_LINKS.SORTING.id);
  const { width, height } = useOnScreenResize();
  const selectedAlgo = useSortingAlgo();
  const updateAlgo = useSortingAlgoUpdate();
  const [array, setArray] = useState<Array<number>>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // generatre our random array
  useEffect(() => {
    const curr = containerRef.current;
    if(curr) {
      const arrLen = Math.floor(curr.getBoundingClientRect().width / 8)
      const newArray = Array.from({length: arrLen}, () => Math.floor(Math.random() * 99) + 1)
      setArray(newArray);
    }
  }, [width, height]);

  const heap = useMemo(() => {
    return new Heap(array);
  }, [width, height]);

  const runSort = () => {
    heap.buildMaxHeap();
    setArray(heap.items);
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
        <div className={`w-full bg-black-25 p-6 rounded-md h-96`} ref={containerRef}>
          <SortDisplay array={array} />
        </div>
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
