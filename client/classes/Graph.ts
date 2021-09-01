import { Heap } from "./Heap";
import { Node } from "./Node";

export class Graph {
  numVertices:number;
  adjacenyList:Map<string, Array<Node>>;

  constructor(numRows: number, numCols: number) {
    this.numVertices = numRows * numCols;
    this.adjacenyList = new Map();
  }

  // add vertex v as key to adjaceny list
  addVertex(v:Node) {
    this.adjacenyList.set(v.getRowCol(), []);
  }

  addEdge(v:Node, w:Node) {
    // set edge between v and w
    this.adjacenyList.get(v.getRowCol())!.push(w);
    // undirected graph so do the same with w to v
    this.adjacenyList.get(w.getRowCol())!.push(v);
  }

  printGraph() {
    const keys = this.adjacenyList.keys();
    
    for(let key of Array.from(keys)) {
      const currentValue = this.adjacenyList.get(key);
      let string = "";

      for(let j of currentValue!) {
        string += `[${j.getRowCol()}] `;
      }
      console.log(key + " -> " + string)
    }
  }
}
