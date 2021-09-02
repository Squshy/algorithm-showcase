import { Heap } from "./Heap";
import { Node } from "./Node";

export class Graph {
  numRows: number;
  numCols: number;
  adjacenyList: Map<string, Set<Node>>;

  constructor(numRows: number, numCols: number) {
    this.numRows = numRows;
    this.numCols = numCols;
    this.adjacenyList = new Map();
  }

  // add vertex v as key to adjaceny list
  addVertex(v: Node) {
    this.adjacenyList.set(v.getRowCol(), new Set());
  }

  addEdge(v: Node, w: Node) {
    const vSet = this.adjacenyList.get(v.getRowCol());
    const wSet = this.adjacenyList.get(w.getRowCol());

    // set edge between v and w
    if (!vSet?.has(w)) {
      this.adjacenyList.get(v.getRowCol())!.add(w);
    } else {
      console.log(`${w} is already in the set v`)
    }

    // undirected graph so do the same with w to v
    if (!wSet?.has(v)) {
      this.adjacenyList.get(w.getRowCol())!.add(v);
    }
  }

  addNeighbouringEdgesToNode(node: Node, row: number, col: number) {
    const nodeToRowCol = (row: number, col: number) => {
      return `${row} ${col}`;
    };

    if (node.row > 0) {
    }
  }

  printGraph() {
    const keys = this.adjacenyList.keys();

    for (let key of Array.from(keys)) {
      const currentValue = this.adjacenyList.get(key);
      let string = "";

      currentValue?.forEach((node) => {
        string += `[${node.getRowCol()}]`;
      });
      console.log(key + " -> " + string);
    }
  }
}
