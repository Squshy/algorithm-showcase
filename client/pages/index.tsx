import type { NextPage } from "next";
import { Grid } from "../components/grid/Grid";
import { Nav } from "../components/nav/Nav";
import { SideBar } from "../components/nav/sidebar/Sidebar";

const Home: NextPage = () => {
  return (
    <div className={`font-sans antialiased`}>
      <Nav />
      <div className={`flex px-4 mx-auto max-w-8xl sm:px-6 lg:px-8 pt-8`}>
        <SideBar />
        <main className={`flex flex-1 min-w-0`}>
          <div className={`flex flex-1 min-w-0 max-w-6xl mx-auto px-2`}>
            <div className={`flex flex-col w-full`}>
              <Grid />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
