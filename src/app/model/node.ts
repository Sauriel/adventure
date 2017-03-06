export class Node {
  depth: number;
  title: string;
  text: string;

  x: number;
  y: number;
  r: number;

  constructor(depth: number) {
    this.depth = depth;
    this.x = 0;
    this.y = 0;
    this.r = 10;
  }

  public setCoordinates(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
