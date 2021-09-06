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
    this.positions.set(this.nodes[i].toString(), j);
    this.positions.set(this.nodes[j].toString(), i);
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

  updateDistance(node: Node, distance: number) {
    const nodeIndex = this.positions.get(node.toString());
    if (nodeIndex === undefined) return;
    this.nodes[nodeIndex].distance = distance;
    let index = nodeIndex;
    // re heapify from where we just updated the distance from
    while (
      index > 0 &&
      this.nodes[index].getWeightedDistance() <
        this.nodes[this.getParentIndex(index)].getWeightedDistance()
    ) {
      this.swap(index, this.getParentIndex(index))
      index = this.getParentIndex(index)
    }
  }

  isEmpty() {
    return this.nodes.length > 0 ? false : true;
  }

  extractMin() {
    const minValue = this.nodes[0];
    const lastNode = this.nodes[this.nodes.length - 1];
    // swap last node to first
    this.nodes[0] = lastNode;
    this.positions.set(lastNode.toString(), 0);
    this.positions.delete(minValue.toString());
    // remove last element we just swapped
    this.nodes.length--;
    this.heapifyDown();

    return minValue;
  }
}
