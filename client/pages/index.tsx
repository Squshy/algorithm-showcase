import type { NextPage } from "next";
import { MainBody } from "../components/MainBody";
import { Nav } from "../components/nav/Nav";
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <>
      <Nav />
      <MainBody>
       <Link href="/pathfinding">Path Finding Link</Link> 
      </MainBody>
    </>
  );
};

export default Home;
