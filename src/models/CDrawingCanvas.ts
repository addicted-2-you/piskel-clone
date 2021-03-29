import { CPixel } from './CPixel';

interface IDrawingCanvasProps {
  frameId: string;
  layerId: string;
  pixelHeight: number;
  pixelWidth: number;
  pixelSize: number;
  isActive: boolean;
  pixels?: CPixel[];
}

export class CDrawingCanvas {
  public frameId: string;

  public layerId: string;

  public pixelHeight: number;

  public pixelWidth: number;

  public pixelSize: number;

  public isActive: boolean;

  public pixels: CPixel[];

  constructor({
    frameId,
    layerId,
    pixelHeight,
    pixelWidth,
    pixelSize,
    isActive,
    pixels = [],
  }: IDrawingCanvasProps) {
    this.frameId = frameId;
    this.layerId = layerId;
    this.pixelHeight = pixelHeight;
    this.pixelWidth = pixelWidth;
    this.pixelSize = pixelSize;
    this.isActive = isActive;
    this.pixels = pixels;
  }

  public get id(): string {
    return `drawing-canvas-${this.frameId}-${this.layerId}`;
  }

  public clone(): CDrawingCanvas {
    return new CDrawingCanvas(this);
  }
}
