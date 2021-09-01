import { Graph } from "./classes/Graph";
import { Heap } from "./classes/Heap";
import { Node } from "./classes/Node";

export const TestHeap = () => {
  const heap = new Heap();
  heap.push(new Node(1, 2, 25));
  heap.push(new Node(1, 2, 5));
  heap.push(new Node(1, 2, 40));
  heap.push(new Node(1, 2, 70));
  heap.push(new Node(1, 2, 90));
  heap.push(new Node(1, 2, 44));
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
};

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

  for(let i = 0; i < nodes.length; i ++ ){
    graph.addVertex(nodes[i])
  }

  graph.addEdge(nodes[0], nodes[1])
  graph.addEdge(nodes[0], nodes[3])
  graph.addEdge(nodes[0], nodes[4])
  graph.addEdge(nodes[1], nodes[2])
  graph.addEdge(nodes[2], nodes[5])
  graph.printGraph();
}
