export class CPixel {
  public xCoord: number;

  public yCoord: number;

  public size: number;

  public color: string;

  constructor(xCoord: number, yCoord: number, size: number, color = '#000000') {
    this.xCoord = xCoord;
    this.yCoord = yCoord;
    this.size = size;
    this.color = color;
  }
}
