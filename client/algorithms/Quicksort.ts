import { Delay } from "../helper";

export async function Quicksort(
  array: Array<number>,
  low: number,
  high: number,
  addToLookedAt: Function,
  removeFromLookedAt: Function,
  setCurrentIndex: Function
) {
  if (low < high) {
    const j = await partition(array, low, high);
    addToLookedAt(low);
    addToLookedAt(high);
    setCurrentIndex(j);
    await Delay(20);
    removeFromLookedAt(low);
    removeFromLookedAt(high);
    await Quicksort(
      array,
      low,
      j - 1,
      addToLookedAt,
      removeFromLookedAt,
      setCurrentIndex
    );
    await Quicksort(
      array,
      j + 1,
      high,
      addToLookedAt,
      removeFromLookedAt,
      setCurrentIndex
    );
  }
  setCurrentIndex(-1);
  return array;
}

async function partition(array: Array<number>, low: number, high: number) {
  const pivot: number = array[high];
  let i = low - 1;
  for (let j = low; j <= high - 1; j++) {
    if (array[j] < pivot) {
      i++;
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  [array[i + 1], array[high]] = [array[high], array[i + 1]];
  return i + 1;
}
