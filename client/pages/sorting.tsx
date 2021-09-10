import type { NextPage } from "next";
import { MainBody } from "../components/MainBody";
import { Nav } from "../components/nav/Nav";
import { SortDisplay } from "../components/sorting/SortDisplay";
import { SIDEBAR_LINKS } from "../constants";
import { useSetLink } from "../hooks/useSetLink";

const Sorting: NextPage = () => {
  useSetLink(SIDEBAR_LINKS.SORTING.id);
  return (
    <>
      <Nav />
      <MainBody>
        <SortDisplay />
        SORTING BB
      </MainBody>
    </>
  );
};

export default Sorting;
