import type { NextPage } from "next";
import { MainBody } from "../components/MainBody";
import { Nav } from "../components/nav/Nav";
import { useSetLink } from "../hooks/useSetLink";
import { SIDEBAR_LINKS } from "../constants";

const Home: NextPage = () => {
  useSetLink(SIDEBAR_LINKS.HOME.id);
  return (
    <>
      <Nav />
      <MainBody>
        <h1 className={`text-3xl font-extrabold`}>About this site</h1>
        <div className={`mt-6 space-y-4`}>
          <p>
            This site is designed to showcase different algorithms and to
            visually see how they work. This can range from path finding
            algorithms, to sorting algorithms.
          </p>
          <p className={`hidden lg:block`}>
            To see the different algorithms offered, check out the side bar!
          </p>
          <p className={`block lg:hidden`}>
            To see the different algorithms offered, check out the button in the
            bottom right of your screen!
          </p>
          <p>
            This code is available on{" "}
            <a
              href="https://github.com/Squshy/algorithm-showcase"
              className={`transition duration-100 ease-in-out text-purple-400 hover:text-purple-500`}
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </MainBody>
    </>
  );
};

export default Home;
