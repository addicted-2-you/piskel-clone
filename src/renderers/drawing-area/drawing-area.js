import store from '~store';
import { CANVAS_STATE } from '~store/state-types';

let canvasesCount = 0;

// + manage multiple canvases
// + save drawing state (localStorage)
// + manage drawing stuff (draw from user, draw from data source)
export default () => {
  const drawingCanvas = document.createElement('canvas');

  drawingCanvas.id = `drawing-canvas-${(canvasesCount += 1)}`;
  drawingCanvas.classList.add('drawing-canvas');

  const drawingArea = document.getElementById('drawing-area');

  store.subscribe(CANVAS_STATE, true, ({ canvasHeight, canvasWidth, pixelSize }) => {
    drawingCanvas.remove();

    drawingCanvas.height = canvasHeight * pixelSize;
    drawingCanvas.width = canvasWidth * pixelSize;

    drawingArea.appendChild(drawingCanvas);
  });
};
