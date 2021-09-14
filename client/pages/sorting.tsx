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
  const containerRef = useRef<HTMLDivElement>(null);
  const [array, setArray] = useState<Array<number>>([]);
  const [heap, setHeap] = useState<Heap>(new Heap(array));
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [lookedAt, setLookedAt] = useState<Set<number>>(() => new Set());

  // generatre our random array
  useEffect(() => {
    createRandomArray();
  }, [width, height]);

  const addIndexToLookedAt = (i: number) => {
    setLookedAt((prev) => new Set(prev).add(i));
  };

  const removeIndexFromLookedAt = (i: number) => {
    setLookedAt((prev) => {
      const next = new Set(prev);
      next.delete(i);
      return next;
    });
  };

  const createRandomArray = () => {
    const curr = containerRef.current;
    if (curr) {
      const arrLen = Math.floor(curr.getBoundingClientRect().width / 8);
      const newArray = Array.from(
        { length: arrLen },
        () => Math.floor(Math.random() * 99) + 1
      );
      setHeap(new Heap(newArray));
      setCurrentIndex(-1);
      setArray(newArray);
    }
  };

  const runSort = () => {
    heap.buildMaxHeap(setCurrentIndex, addIndexToLookedAt, removeIndexFromLookedAt);
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
        <div
          className={`w-full bg-black-25 p-6 rounded-md h-96`}
          ref={containerRef}
        >
          <SortDisplay array={array} currentIndex={currentIndex} lookedAt={lookedAt} />
        </div>
        <button
          className={`p-2 bg-purple-500 rounded-md self-center mt-6 hover:bg-purple-600 transition duration-150 ease-out`}
          onClick={() => runSort()}
        >
          Start
        </button>
        <button
          className={`p-2 bg-purple-500 rounded-md self-center mt-6 hover:bg-purple-600 transition duration-150 ease-out`}
          onClick={() => createRandomArray()}
        >
          New Data
        </button>
      </MainBody>
    </SortingProvider>
  );
};

export default Sorting;
