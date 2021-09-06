import { Node } from "./Node";

export class Heap {
  nodes: Array<Node>;
  positions: Map<string, number>;
  constructor() {
    this.nodes = [];
    this.positions = new Map();
  }

  getParentIndex(i: number) {
    return Math.floor((i - 1) / 2);
  }

  getLeftChildIndex(i: number) {
    return i * 2 + 1;
  }

  getRightChildIndex(i: number) {
    return i * 2 + 2;
  }

  swap(i: number, j: number) {
    const temp_ = this.nodes[i];
    this.positions.set(this.nodes[i].toString(), this.positions.get(this.nodes[j].toString())!)
    this.positions.set(this.nodes[j].toString(), this.positions.get(temp_.toString())!)
    this.nodes[i] = this.nodes[j];
    this.nodes[j] = temp_;
  }

  push(node: Node) {
    this.nodes.push(node);
    this.positions.set(node.toString(), this.nodes.length - 1);
    this.heapifyUp();
  }

  heapifyUp() {
    let currentIdx: number = this.nodes.length - 1;
    if (currentIdx < 0) return;

    while (
      this.nodes[this.getParentIndex(currentIdx)] &&
      this.nodes[currentIdx].getWeightedDistance() <
        this.nodes[this.getParentIndex(currentIdx)].getWeightedDistance()
    ) {
      this.swap(currentIdx, this.getParentIndex(currentIdx));

      currentIdx = this.getParentIndex(currentIdx);
    }
  }

  heapifyDown() {
    let currentIdx = 0;

    while (this.nodes[this.getLeftChildIndex(currentIdx)] !== undefined) {
      let smallestChildIdx = this.getLeftChildIndex(currentIdx);

      if (
        this.nodes[this.getRightChildIndex(currentIdx)] !== undefined &&
        this.nodes[this.getRightChildIndex(currentIdx)].getWeightedDistance() <
          this.nodes[this.getLeftChildIndex(currentIdx)].getWeightedDistance()
      ) {
        smallestChildIdx = this.getRightChildIndex(currentIdx);
      }

      if (
        this.nodes[currentIdx].getWeightedDistance() >
        this.nodes[smallestChildIdx].getWeightedDistance()
      ) {
        this.swap(currentIdx, smallestChildIdx);
        currentIdx = smallestChildIdx;
      } else {
        return;
      }
    }
  }

  updateDistance(node:Node, distance:number) {
    const nodeIndex = this.positions.get(node.toString())!;
    const nodes = [...this.nodes]
    nodes[nodeIndex].distance = distance;
    this.nodes = nodes;
  }

  getNeighbours(nodes:Array<Node>) {
    const ret:Array<Node> = []
    for(let node of nodes) {
      ret.push(this.nodes[this.positions.get(node.toString())!])
    }
    return ret
  }

  isEmpty() {
    return this.nodes.length > 0 ? false : true;
  }

  extractMin() {
    const minValue = this.nodes[0];
    // swap last node to first
    this.nodes[0] = this.nodes[this.nodes.length - 1];
    this.positions.delete(minValue.toString())
    // remove last element we just swapped
    this.nodes.length--;
    this.heapifyDown();

    return minValue;
  }
}
