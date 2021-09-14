import { Delay } from "../helper";

export class Heap {
  items: Array<number>;
  constructor(items: Array<number>) {
    this.items = [...items];
  }

  parent(index: number) {
    return Math.floor((index - 1) / 2);
  }

  left(index: number) {
    return index * 2 + 1;
  }

  right(index: number) {
    return index * 2 + 2;
  }

  async maxHeapify(index: number, addLookedAt:Function, removeLookedAt:Function) {
    const left: number = this.left(index);
    const right: number = this.right(index);
    let largest: number = index;

    // if the left child is greater than the current largest
    if (left < this.items.length && this.items[left] > this.items[largest])
      largest = left;
    // if the right child is greater than the current largest
    if (right < this.items.length && this.items[right] > this.items[largest])
      largest = right;
    // If there was a change
    if (largest !== index) {
      // swap the items
      [this.items[index], this.items[largest]] = [
        this.items[largest],
        this.items[index],
      ];
      addLookedAt(index)
      addLookedAt(largest)
      await Delay(2);
      removeLookedAt(index);
      removeLookedAt(largest);
      this.maxHeapify(largest, addLookedAt, removeLookedAt);
    }
  }

  async buildMaxHeap(setIndex: Function, addLookedAt:Function, removeLookedAt:Function) {
    // start at last non-leaf node
    // heapfiy only non-leaf nodes in reverse order
    for (let i = Math.floor(this.items.length / 2 - 1); i >= 0; i--) {
      await Delay(10);
      this.maxHeapify(i, addLookedAt, removeLookedAt);
      setIndex(i);
    }
    // reset the saved index once function is done so we don't see colored bar on first item
    setIndex(-1);
  }
}
