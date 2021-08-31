import type { NextPage } from "next";
import { Nav } from "../components/nav/Nav";

const Home: NextPage = () => {
  return (
    <div className={`font-sans antialiased`}>
      <Nav />
    </div>
  );
};

export default Home;
