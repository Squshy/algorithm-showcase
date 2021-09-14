import type { NextPage } from "next";
import { Grid } from "../components/grid/Grid";
import { MainBody } from "../components/MainBody";
import { Dropdown } from "../components/nav/Dropdown";
import { Nav } from "../components/nav/Nav";
import { PATHFINDING_ALGOS, SIDEBAR_LINKS } from "../constants";
import {
  PathfindingProvider,
  usePathfindingAlgo,
  usePathfindingAlgoUpdate,
} from "../contexts/PathfindingContext";
import { useSetLink } from "../hooks/useSetLink";

const PathFinding: NextPage = () => {
  useSetLink(SIDEBAR_LINKS.PATHFINDING.id);
  const updateAlgo = usePathfindingAlgoUpdate();
  const currentAlgo = usePathfindingAlgo();

  return (
    <PathfindingProvider>
      <Nav>
        <Dropdown
          data={PATHFINDING_ALGOS}
          onSubItemClick={updateAlgo}
          selected={currentAlgo}
        />
      </Nav>
      <MainBody>
        <Grid />
      </MainBody>
    </PathfindingProvider>
  );
};

export default PathFinding;
