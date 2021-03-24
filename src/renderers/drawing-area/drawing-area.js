import store from '~store';
import { CANVAS_STATE } from '~store/state-types';

import { getPixel, drawPixel } from '~utils/drawing-canvas.utils';

let canvasesCount = 0;

function onMouseMove({ target, clientX, clientY }) {
  const { xCoord, yCoord } = getPixel(target.getBoundingClientRect(), 20, clientX, clientY);
  drawPixel(target, xCoord, yCoord, 20, '#000000');
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

  store.subscribe(CANVAS_STATE, true, ({ canvasHeight, canvasWidth, pixelSize }) => {
    drawingCanvas.remove();

    drawingCanvas.height = canvasHeight * pixelSize;
    drawingCanvas.width = canvasWidth * pixelSize;

    drawingArea.appendChild(drawingCanvas);
  });
};
