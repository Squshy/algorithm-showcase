import type { NextPage } from "next";
import { MainBody } from "../components/MainBody";
import { Nav } from "../components/nav/Nav";
import Link from "next/link";
import { useSetLink } from "../hooks/useSetLink";
import { SIDEBAR_LINKS } from "../constants";

const Home: NextPage = () => {
  useSetLink(SIDEBAR_LINKS.HOME.id);
  return (
    <>
      <Nav />
      <MainBody>
        <h1 className={`text-3xl font-extrabold`}>About this site</h1>
      </MainBody>
    </>
  );
};

export default Home;
