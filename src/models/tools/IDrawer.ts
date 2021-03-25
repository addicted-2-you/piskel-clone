import { CPixel } from '~/models/CPixel';

export interface IDrawer {
  draw(hoveredPixel: CPixel, canvasHeight: number, canvasWidth: number): CPixel[];

  drawCtrl(hoveredPixel: CPixel, canvasHeight: number, canvasWidth: number): CPixel[];

  drawShift(hoveredPixel: CPixel, canvasHeight: number, canvasWidth: number): CPixel[];
}
