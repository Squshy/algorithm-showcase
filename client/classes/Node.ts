export class Node {
  weight: number;
  row: number;
  col: number;
  distance: number;
  visited: boolean;
  isWall: boolean;
  isStart: boolean;
  isEnd: boolean;
  neighbours?: Array<Node>;

  constructor(row: number, col: number, weight: number = 0) {
    this.weight = weight;
    this.row = row;
    this.col = col;
    this.distance = Infinity;
    this.visited = false;
    this.isWall = false;
    this.isStart = false;
    this.isEnd = false;
  }

  setWeight(weight: number) {
    this.weight = weight;
  }

  setDistance(distance: number) {
    this.distance = distance;
  }

  toggleWall() {
    this.isWall = !this.isWall;
  }

  markAsVisited() {
    this.visited = true;
  }

  getWeightedDistance() {
    return this.distance + this.weight;
  }

  toString() {
    return `[${this.row} ${this.col}]`
  }
}
