import type { NextPage } from "next";
import { Heap } from "../classes/Heap";
import { Grid } from "../components/grid/Grid";
import { Nav } from "../components/nav/Nav";
import { SideBar } from "../components/nav/sidebar/Sidebar";

const Home: NextPage = () => {
  const heap = new Heap();
  heap.push(25);
  heap.push(5);
  heap.push(40);
  heap.push(70);
  heap.push(90);
  heap.push(44);
  console.log(heap.nodes.join(","));

  let a = [];
  a.push(heap.extractMin());
  a.push(heap.extractMin());
  a.push(heap.extractMin());
  a.push(heap.extractMin());
  a.push(heap.extractMin());
  console.log("Bottom 5 items:", a);
  a.push(heap.extractMin());
  console.log(heap.nodes.join(","));
  return (
    <div className={`font-sans antialiased`}>
      <Nav />
      <div className={`flex px-4 mx-auto max-w-8xl sm:px-6 lg:px-8 pt-8`}>
        <SideBar />
        <main className={`flex flex-1 min-w-0`}>
          <div className={`flex flex-1 min-w-0 max-w-6xl mx-auto px-2`}>
            <Grid />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
