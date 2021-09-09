import type { NextPage } from "next";
import { Grid } from "../components/grid/Grid";
import { MainBody } from "../components/MainBody";
import { Nav } from "../components/nav/Nav";
import { SideBar } from "../components/nav/sidebar/Sidebar";
import { PathfindingMenu } from "../components/pathfinding/PathfindingMenu";
import { SIDEBAR_LINKS } from "../constants";
import { useSetLink } from "../hooks/useSetLink";

const PathFinding: NextPage = () => {
  useSetLink(SIDEBAR_LINKS.PATHFINDING.id);

  return (
    <>
      <Nav display={<PathfindingMenu />} />
      <MainBody>
        <Grid />
      </MainBody>
    </>
  );
};

export default PathFinding;
