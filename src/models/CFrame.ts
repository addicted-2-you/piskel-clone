import { CDrawingCanvas } from './CDrawingCanvas';
import { CPixel } from './CPixel';

interface IFrameProps {
  id: string;
  layers?: CDrawingCanvas[];
  canvasImage?: string;
}

export class CFrame {
  public id: string;

  public layers: CDrawingCanvas[];

  public activeLayerId: string;

  public canvasImage: string;

  constructor({ id, layers = [], canvasImage = '' }: IFrameProps) {
    this.id = id;
    this.layers = layers;
    this.activeLayerId = layers[0]?.layerId || '';
    this.canvasImage = canvasImage;
  }

  public cloneLayers(newFrameId?: string): CDrawingCanvas[] {
    return this.layers.map((layer) => {
      const newLayer = new CDrawingCanvas({ ...layer });
      newLayer.pixels = [];
      if (newFrameId) {
        newLayer.frameId = newFrameId;
      }

      layer.pixels.forEach((pixel) => {
        newLayer.pixels.push(new CPixel(pixel.xCoord, pixel.yCoord, pixel.penSize, pixel.color));
      });

      return newLayer;
    });
  }
}
