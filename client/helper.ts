import { Graph } from "./classes/Graph";
import { NodeHeap } from "./classes/NodeHeap";
import { Node } from "./classes/Node";
import { Heap } from "./classes/Heap";

export const TestNodeHeap = () => {
  const heap = new NodeHeap();
  heap.push(new Node(1, 2, 25));
  heap.push(new Node(1, 2, 5));
  heap.push(new Node(1, 2, 40));
  heap.push(new Node(1, 2, 70));
  heap.push(new Node(1, 2, 90));
  heap.push(new Node(1, 2, 44));
  console.log(heap.nodes.join(","));
  let a = [];
  a.push(heap.extractMin().distance);
  a.push(heap.extractMin().distance);
  a.push(heap.extractMin().distance);
  a.push(heap.extractMin().distance);
  a.push(heap.extractMin().distance);
  console.log("Bottom 5 items:", a);
  a.push(heap.extractMin());
  console.log(heap.nodes.join(","));
};

export const TestHeap = () => {
  const arr:Array<number> = [5,8,2,43,67]
  const heap = new Heap(arr);
  // heap.buildMaxHeap();
  console.log(heap.items)
}

export const TestGraph = () => {
  const graph = new Graph(2, 3);
  const nodes = [
    new Node(0, 0),
    new Node(0, 1),
    new Node(0, 2),
    new Node(1, 0),
    new Node(1, 1),
    new Node(1, 2),
  ];

  for (let i = 0; i < nodes.length; i++) {
    graph.addVertex(nodes[i]);
  }

  graph.addEdge(nodes[0], nodes[1]);
  graph.addEdge(nodes[0], nodes[3]);
  graph.addEdge(nodes[0], nodes[4]);
  graph.addEdge(nodes[1], nodes[2]);
  graph.addEdge(nodes[2], nodes[5]);
  graph.printGraph();
};

export const Delay = (delay:number) => new Promise(res => setTimeout(res, delay))
