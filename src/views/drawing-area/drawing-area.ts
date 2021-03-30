import store from '~/store/index';
import { EStateTypes } from '~/store/EStateTypes';

import { CFrame } from '~/models/CFrame';

import createDrawingCanvasElement from '~/components/drawing-canvas';

import { drawPixels } from '~/services/canvas.services';

export default (): void => {
  const drawingArea = document.getElementById('drawing-area') as HTMLElement;

  store.subscribe(
    [EStateTypes.FRAMES_STATE, EStateTypes.CANVAS_STATE],
    true,
    ({
      [EStateTypes.FRAMES_STATE]: { activeFrameId, frames },
      [EStateTypes.CANVAS_STATE]: { pixelSize },
    }) => {
      drawingArea.innerHTML = '';

      const activeFrame = frames.find((frame: CFrame) => frame.id === activeFrameId) as CFrame;
      const drawingCanvasesFragment = document.createDocumentFragment();

      activeFrame.layers.forEach((drawingCanvas) => {
        const drawingCanvasElement = createDrawingCanvasElement({
          drawingCanvas,
          activeFrameId,
          pixelSize,
        });

        drawPixels(drawingCanvasElement, drawingCanvas.pixels, pixelSize);
        drawingCanvasesFragment.appendChild(drawingCanvasElement);
      });

      drawingArea.appendChild(drawingCanvasesFragment);
    },
  );
};
