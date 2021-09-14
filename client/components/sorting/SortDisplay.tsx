import React, { useRef, useEffect, useState } from "react";
import { useOnScreenResize } from "../../hooks/useOnResize";
import { Bar } from "./Bar";

interface SortDisplayProps {
  array: Array<number>;
  currentIndex: number;
  lookedAt: Set<number>;
}

export const SortDisplay: React.FC<SortDisplayProps> = ({
  array,
  currentIndex,
  lookedAt
}) => {
  const { width, height } = useOnScreenResize();
  const maxValue = Math.max(...array);
  const containerRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState<number>(0);

  useEffect(() => {
    if (containerRef.current)
      setMaxHeight(containerRef.current.getBoundingClientRect().height);
  }, [height, width]);

  return (
    <div
      ref={containerRef}
      className={`flex flex-row justify-center h-full -mr-px -ml-px`}
    >
      {array.map((num, i) => {
        return (
          <Bar
            key={i}
            number={num}
            maxNumber={maxValue}
            maxHeight={maxHeight}
            current={currentIndex===i}
            lookedAt={lookedAt.has(i)}
          />
        );
      })}
    </div>
  );
};
