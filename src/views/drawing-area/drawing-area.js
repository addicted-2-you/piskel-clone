import store from '~/store/index';
import { EStateTypes } from '~/store/EStateTypes';

import { createDrawer } from '~/services/create-drawer';

import { getPixel, drawPixels } from '~/utils/drawing-canvas.utils';

let canvasesCount = 0;

function onDraw(event) {
  const { target, clientX, clientY } = event;
  const { activeTool } = store.getState(EStateTypes.TOOLBAR_STATE);
  const { canvasHeight, canvasWidth, pixelSize } = store.getState(EStateTypes.CANVAS_STATE);

  const hoveredPixel = getPixel(target.getBoundingClientRect(), pixelSize, clientX, clientY);

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

  drawPixels(target, pixelsToDraw);
}

function onStopDraw({ target }) {
  target.removeEventListener('mousemove', onDraw);
  target.removeEventListener('mouseleave', onStopDraw);

  // update canvas image on the frame
  const { activeFrameId } = store.getState(EStateTypes.FRAMES_STATE);
  const activeFrameViewItem = document.getElementById(`${activeFrameId}-preview`);
  activeFrameViewItem.style.backgroundImage = `url("${target.toDataURL('image/png', 1)}")`;
}

function onStartDraw({ target }) {
  target.addEventListener('mousemove', onDraw);
  target.addEventListener('mouseleave', onStopDraw);
}

export default () => {
  const drawingCanvas = document.createElement('canvas');
  drawingCanvas.id = `drawing-canvas-${(canvasesCount += 1)}`;
  drawingCanvas.classList.add('drawing-canvas');
  drawingCanvas.addEventListener('mousedown', onStartDraw);
  drawingCanvas.addEventListener('mousedown', onDraw);
  drawingCanvas.addEventListener('mouseup', onStopDraw);

  const drawingArea = document.getElementById('drawing-area');

  store.subscribe(EStateTypes.CANVAS_STATE, true, ({ canvasHeight, canvasWidth, pixelSize }) => {
    drawingCanvas.innerHTML = '';
    drawingCanvas.remove();

    drawingCanvas.height = canvasHeight * pixelSize;
    drawingCanvas.width = canvasWidth * pixelSize;

    drawingArea.appendChild(drawingCanvas);
  });
};
