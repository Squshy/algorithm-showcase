import { useState, useEffect, useRef } from "react";
import type { NextPage } from "next";
import { MainBody } from "../components/MainBody";
import { Dropdown } from "../components/nav/Dropdown";
import { Nav } from "../components/nav/Nav";
import { SortDisplay } from "../components/sorting/SortDisplay";
import { SIDEBAR_LINKS, SORTING_ALGOS } from "../constants";
import {
  useSortingAlgo,
  useSortingAlgoUpdate,
} from "../contexts/SortingContext";
import { useSetLink } from "../hooks/useSetLink";
import { Heap } from "../classes/Heap";
import { useOnScreenResize } from "../hooks/useOnResize";
import { PlayIcon, RefreshIcon } from "@heroicons/react/solid";
import { Quicksort } from "../algorithms/Quicksort";

const COMMON_ICON_STYLES = `w-8 h-8 transform transition duration-300 ease-in-out hover:scale-110 cursor-pointer`;

const Sorting: NextPage = () => {
  useSetLink(SIDEBAR_LINKS.SORTING.id);
  const { width, height } = useOnScreenResize();
  const selectedAlgo = useSortingAlgo();
  const updateAlgo = useSortingAlgoUpdate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [array, setArray] = useState<Array<number>>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [lookedAt, setLookedAt] = useState<Set<number>>(() => new Set());
  const [isAlgoRunning, setIsAlgoRunning] = useState<boolean>(false);

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
      setCurrentIndex(-1);
      setArray(newArray);
    }
  };

  const runSort = async () => {
    const heap = new Heap(array);
    switch (selectedAlgo) {
      case SORTING_ALGOS.MAX_HEAP:
        heap.buildMaxHeap(
          setCurrentIndex,
          addIndexToLookedAt,
          removeIndexFromLookedAt
        );
        setArray(heap.items);
        break;
      case SORTING_ALGOS.MIN_HEAP:
        heap.buildMinHeap(
          setCurrentIndex,
          addIndexToLookedAt,
          removeIndexFromLookedAt
        );
        setArray(heap.items);
        break;
      case SORTING_ALGOS.QUICK_SORT:
        const quickArr = await Quicksort(
          array,
          0,
          array.length - 1,
          addIndexToLookedAt,
          removeIndexFromLookedAt,
          setCurrentIndex
        );
        setArray(quickArr);
    }
  };

  const play = async () => {
    if (isAlgoRunning) return;
    setIsAlgoRunning(true);
    await runSort();
    setIsAlgoRunning(false);
  };

  return (
    <>
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
          <SortDisplay
            array={array}
            currentIndex={currentIndex}
            lookedAt={lookedAt}
          />
        </div>
        <div className={`flex flex-row justify-center space-x-4 p-2`}>
          <button onClick={() => play()}>
            <span className="sr-only">Run algorithm</span>
            <PlayIcon
              className={`${COMMON_ICON_STYLES} text-green-500 hover:text-green-400`}
            />
          </button>
          <button onClick={() => createRandomArray()}>
            <span className="sr-only">Get new data</span>
            <RefreshIcon
              className={`${COMMON_ICON_STYLES} text-gray-500 hover:text-gray-400 hover:rotate-180`}
            />
          </button>
        </div>
      </MainBody>
    </>
  );
};

export default Sorting;
