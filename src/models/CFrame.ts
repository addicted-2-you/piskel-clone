import { CDrawingCanvas } from './CDrawingCanvas';

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
}
