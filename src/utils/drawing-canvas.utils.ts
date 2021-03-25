import { CPixel } from '~/models/CPixel';

export const getPixel = (
  canvasBoundingClientRect: DOMRect,
  pixelSize: number,
  clientX: number,
  clientY: number,
): CPixel =>
  new CPixel(
    Math.floor((clientX - canvasBoundingClientRect.left) / pixelSize),
    Math.floor((clientY - canvasBoundingClientRect.top) / pixelSize),
    pixelSize,
  );

export function drawPixel(canvas: HTMLCanvasElement, pixel: CPixel): void {
  const context = canvas.getContext('2d');
  if (context) {
    context.fillStyle = pixel.color;
    context.fillRect(pixel.xCoord * pixel.size, pixel.yCoord * pixel.size, pixel.size, pixel.size);
  }
}

export function drawPixels(canvas: HTMLCanvasElement, pixels: CPixel[]): void {
  pixels.forEach((pixel) => drawPixel(canvas, pixel));
}
