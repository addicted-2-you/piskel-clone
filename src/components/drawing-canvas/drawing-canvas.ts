import store from '~/store/index';
import { EStateTypes } from '~/store/EStateTypes';

import { CPixel } from '~/models/CPixel';
import { CDrawingCanvas } from '~/models/CDrawingCanvas';

import { createDrawer } from '~/services/create-drawer';
import { getPixel, drawPixels } from '~/services/canvas.services';
import {
  getActiveDrawingCanvas,
  saveDrawingCanvasPixels,
} from '~/services/drawing-canvas.services';
import { getActiveFrame, setFrameCanvasImage } from '~/services/frame.services';

let drawnPixels: CPixel[] = [];

function onDraw(event) {
  const { target, clientX, clientY } = event;
  const { activeTool } = store.getState(EStateTypes.TOOLBAR_STATE);
  const { canvasHeight, canvasWidth, pixelSize, penSize } = store.getState(
    EStateTypes.CANVAS_STATE,
  );

  const hoveredPixel = getPixel(
    target.getBoundingClientRect(),
    pixelSize,
    penSize,
    clientX,
    clientY,
  );

  let pixelsToDraw = [];

  if (event.ctrlKey && event.shiftKey) {
    pixelsToDraw = [
      ...createDrawer(activeTool).drawCtrl(hoveredPixel, canvasHeight, canvasWidth),
      ...createDrawer(activeTool).drawShift(hoveredPixel, canvasHeight, canvasWidth),
      ...createDrawer(activeTool).draw(hoveredPixel, canvasHeight, canvasWidth),
    ];
  } else if (event.ctrlKey) {
    pixelsToDraw = createDrawer(activeTool).drawCtrl(hoveredPixel, canvasHeight, canvasWidth);
  } else if (event.shiftKey) {
    pixelsToDraw = createDrawer(activeTool).drawShift(hoveredPixel, canvasHeight, canvasWidth);
  } else {
    pixelsToDraw = createDrawer(activeTool).draw(hoveredPixel, canvasHeight, canvasWidth);
  }

  drawPixels(target, pixelsToDraw, pixelSize);
  drawnPixels.push(...pixelsToDraw);
}

function onStopDraw({ target }) {
  target.removeEventListener('mousemove', onDraw);
  target.removeEventListener('mouseleave', onStopDraw);

  // save drawn pixels
  saveDrawingCanvasPixels(getActiveFrame().id, getActiveDrawingCanvas().id, drawnPixels);
  drawnPixels = [];

  // update canvas image on the frame
  const { activeFrameId } = store.getState(EStateTypes.FRAMES_STATE);
  const activeFrameViewItem = document.getElementById(`${activeFrameId}-preview`) as HTMLElement;
  const canvasImage = `url("${target.toDataURL('image/png', 1)}")`;
  activeFrameViewItem.style.backgroundImage = canvasImage;

  // save canvas image on the frame
  setFrameCanvasImage(activeFrameId, canvasImage);
}

function onStartDraw({ target }) {
  target.addEventListener('mousemove', onDraw);
  target.addEventListener('mouseleave', onStopDraw);
}

interface IDrawingCanvasElementProps {
  drawingCanvas: CDrawingCanvas;
  activeFrameId: string;
  pixelSize: number;
}

export default ({
  drawingCanvas,
  activeFrameId,
  pixelSize,
}: IDrawingCanvasElementProps): HTMLCanvasElement => {
  const drawingCanvasElement = document.createElement('canvas');
  drawingCanvasElement.id = drawingCanvas.id;
  drawingCanvasElement.classList.add('drawing-canvas');
  drawingCanvasElement.style.display = activeFrameId === drawingCanvas.frameId ? 'block' : 'none';
  drawingCanvasElement.height = drawingCanvas.pixelHeight * pixelSize;
  drawingCanvasElement.width = drawingCanvas.pixelWidth * pixelSize;
  drawingCanvasElement.addEventListener('mousedown', onStartDraw);
  drawingCanvasElement.addEventListener('mousedown', onDraw);
  drawingCanvasElement.addEventListener('mouseup', onStopDraw);
  return drawingCanvasElement;
};
