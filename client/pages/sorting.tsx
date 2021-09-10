import type { NextPage } from "next";
import { MainBody } from "../components/MainBody";
import { Nav } from "../components/nav/Nav";
import { SIDEBAR_LINKS } from "../constants";
import { useSetLink } from "../hooks/useSetLink";

const Sorting: NextPage = () => {
  useSetLink(SIDEBAR_LINKS.SORTING.id);
  return (
    <>
      <Nav />
      <MainBody>SORTING BB</MainBody>
    </>
  );
};

export default Sorting;
