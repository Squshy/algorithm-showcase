import { Node } from "./Node";

export class Heap {
  nodes: Array<Node>;
  constructor() {
    this.nodes = [];
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
    this.nodes[i] = this.nodes[j];
    this.nodes[j] = temp_;
  }

  push(key: Node) {
    this.nodes.push(key);
    this.heapifyUp();
  }

  heapifyUp() {
    let currentIdx: number = this.nodes.length - 1;
    
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

  extractMin() {
    const minValue = this.nodes[0];
    // swap last node to first
    this.nodes[0] = this.nodes[this.nodes.length - 1];
    // remove last element we just swapped
    this.nodes.length--;
    this.heapifyDown();

    return minValue;
  }
}
