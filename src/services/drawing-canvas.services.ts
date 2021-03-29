import store from '~/store';
import { EStateTypes } from '~/store/EStateTypes';

import { CPixel } from '~/models/CPixel';
import { CDrawingCanvas } from '~/models/CDrawingCanvas';

import { getActiveFrame, getFrame } from './frame.services';

const framesLayersMap = new Map<string, number>();

export function createDrawingCanvas(frameId: string): CDrawingCanvas {
  let layerNumber = 1;
  if (framesLayersMap.get(frameId)) {
    layerNumber = (framesLayersMap.get(frameId) as number) + 1;
    framesLayersMap.set(frameId, layerNumber);
  } else {
    framesLayersMap.set(frameId, layerNumber);
  }

  return new CDrawingCanvas({
    frameId,
    layerId: `${layerNumber}`,
    pixelHeight: 32,
    pixelWidth: 32,
    pixelSize: 20,
    isActive: true,
  });
}

export function getDrawingCanvas(frameId: string, drawingCanvasId: string): CDrawingCanvas {
  const { layers } = getFrame(frameId);
  return layers.find((layer) => layer.id === drawingCanvasId) as CDrawingCanvas;
}

export function getActiveDrawingCanvas(): CDrawingCanvas {
  const { id } = getActiveFrame();
  const { layers } = getFrame(id);
  return layers.find((layer) => layer.isActive) as CDrawingCanvas;
}

export function saveDrawingCanvasPixels(
  frameId: string,
  drawingCanvasId: string,
  newPixels: CPixel[],
): void {
  const drawingCanvas = getDrawingCanvas(frameId, drawingCanvasId);
  drawingCanvas.pixels = [...drawingCanvas.pixels, ...newPixels];

  // trigger update
  store.mutate(EStateTypes.FRAMES_STATE, {});
}
