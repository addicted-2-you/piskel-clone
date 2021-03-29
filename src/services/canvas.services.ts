import { CPixel } from '~/models/CPixel';

export const getPixel = (
  canvasBoundingClientRect: DOMRect,
  pixelSize: number,
  penSize: number,
  clientX: number,
  clientY: number,
): CPixel =>
  new CPixel(
    Math.floor((clientX - canvasBoundingClientRect.left) / (pixelSize * penSize)),
    Math.floor((clientY - canvasBoundingClientRect.top) / (pixelSize * penSize)),
    penSize,
  );

export function drawPixel(canvas: HTMLCanvasElement, pixel: CPixel, pixelSize: number): void {
  const context = canvas.getContext('2d');
  if (context) {
    context.fillStyle = pixel.color;
    context.fillRect(
      pixel.xCoord * pixel.penSize * pixelSize,
      pixel.yCoord * pixel.penSize * pixelSize,
      pixel.penSize * pixelSize,
      pixel.penSize * pixelSize,
    );
  }
}

export function drawPixels(canvas: HTMLCanvasElement, pixels: CPixel[], pixelSize: number): void {
  pixels.forEach((pixel) => drawPixel(canvas, pixel, pixelSize));
}
