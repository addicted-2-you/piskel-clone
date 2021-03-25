import store from '~/store/index';
import { EStateTypes } from '~/store/EStateTypes';

import { createDrawer } from '~/drawers/create-drawer';

import { getPixel, drawPixels } from '~/utils/drawing-canvas.utils.ts';

let canvasesCount = 0;

function onMouseMove({ target, clientX, clientY }) {
  const { activeTool } = store.getState(EStateTypes.TOOLBAR_STATE);
  const { canvasHeight, canvasWidth, pixelSize } = store.getState(EStateTypes.CANVAS_STATE);

  const hoveredPixel = getPixel(target.getBoundingClientRect(), pixelSize, clientX, clientY);
  const pixelsToDraw = createDrawer(activeTool).draw(hoveredPixel, canvasHeight, canvasWidth);
  drawPixels(target, pixelsToDraw);
}

function onMouseLeave({ target }) {
  target.removeEventListener('mousemove', onMouseMove);
}

function onMouseDown({ target }) {
  target.addEventListener('mousemove', onMouseMove);
  target.addEventListener('mouseleave', onMouseLeave);
}

function onMouseUp({ target }) {
  target.removeEventListener('mousemove', onMouseMove);
}

export default () => {
  const drawingCanvas = document.createElement('canvas');
  drawingCanvas.id = `drawing-canvas-${(canvasesCount += 1)}`;
  drawingCanvas.classList.add('drawing-canvas');
  drawingCanvas.addEventListener('mousedown', onMouseDown);
  drawingCanvas.addEventListener('mouseup', onMouseUp);

  const drawingArea = document.getElementById('drawing-area');

  store.subscribe(EStateTypes.CANVAS_STATE, true, ({ canvasHeight, canvasWidth, pixelSize }) => {
    drawingCanvas.innerHTML = '';
    drawingCanvas.remove();

    drawingCanvas.height = canvasHeight * pixelSize;
    drawingCanvas.width = canvasWidth * pixelSize;

    drawingArea.appendChild(drawingCanvas);
  });
};
