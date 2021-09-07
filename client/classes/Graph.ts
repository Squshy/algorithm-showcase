import { flatted2DArray } from "../utils";
import { Heap } from "./Heap";
import { Node } from "./Node";

export class Graph {
  numRows: number;
  numCols: number;
  adjacencyList: Map<string, Set<Node>>;

  constructor(numRows: number, numCols: number) {
    this.numRows = numRows;
    this.numCols = numCols;
    this.adjacencyList = new Map();
  }

  // add vertex v as key to adjaceny list
  addVertex(v: Node) {
    this.adjacencyList.set(v.toString(), new Set());
  }

  addEdge(v: Node, w: Node) {
    const vSet = this.adjacencyList.get(v.toString());
    const wSet = this.adjacencyList.get(w.toString());

    // set edge between v and w
    if (!vSet?.has(w)) {
      this.adjacencyList.get(v.toString())!.add(w);
    }

    // undirected graph so do the same with w to v
    if (!wSet?.has(v)) {
      this.adjacencyList.get(w.toString())!.add(v);
    }
  }

  addNeighbouringEdgesToNode(
    node: Node,
    allNodes: Array<Array<Node>>,
    maxRows: number,
    maxCols: number
  ) {
    if (node.row > 0) {
      this.addEdge(node, allNodes[node.row - 1][node.col]);
    }
    if (node.row < maxRows - 1) {
      this.addEdge(node, allNodes[node.row + 1][node.col]);
    }
    if (node.col > 0) {
      this.addEdge(node, allNodes[node.row][node.col - 1]);
    }
    if (node.col < maxCols - 1) {
      this.addEdge(node, allNodes[node.row][node.col + 1]);
    }
  }

  dijkstra(allNodes: Array<Array<Node>>) {
    const visitedNodes: Array<Node> = [];
    const minHeap = new Heap();
    const flattened = flatted2DArray(allNodes);

    // add each node to the heap
    flattened.forEach((node: Node) => {
      minHeap.push(node);
    });

    while (minHeap.isEmpty() === false) {
      const closestNode = minHeap.extractMin();
      if (closestNode.isWall) continue;
      if(closestNode.distance === Infinity) return null;
      visitedNodes.push(closestNode);

      if (closestNode.isEnd) {
        return visitedNodes;
      }

      for (let neighbour of Array.from(
        this.adjacencyList.get(closestNode.toString())!
      )) {
        const relaxation = closestNode.distance + neighbour.weight + 1;

        if (relaxation < neighbour.distance) {
          minHeap.updateDistance(neighbour, relaxation, closestNode);
        }
      }
    }
    return null;
  }

  printGraph() {
    const keys = this.adjacencyList.keys();

    for (let key of Array.from(keys)) {
      const currentValue = this.adjacencyList.get(key);
      let string = "";

      currentValue?.forEach((node) => {
        string += `${node.toString()}, `;
      });
      console.log(key + " -> " + string + "\n");
    }
  }
}
