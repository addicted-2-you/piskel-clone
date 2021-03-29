export class CPixel {
  public xCoord: number;

  public yCoord: number;

  public penSize: number;

  public color: string;

  constructor(xCoord: number, yCoord: number, penSize: number, color = '#000000') {
    this.xCoord = xCoord;
    this.yCoord = yCoord;
    this.penSize = penSize;
    this.color = color;
  }
}
