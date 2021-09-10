import { useState } from "react";
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

const Sorting: NextPage = () => {
  useSetLink(SIDEBAR_LINKS.SORTING.id);
  const selectedAlgo = useSortingAlgo();
  const updateAlgo = useSortingAlgoUpdate();
  const [array, setArray] = useState<Array<number>>([5,8,2,43,67]);

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
        <SortDisplay array={array}/>
      </MainBody>
    </SortingProvider>
  );
};

export default Sorting;
