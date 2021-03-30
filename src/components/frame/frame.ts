import { CFrame } from '~/models/CFrame';
import { setActiveFrameId } from '~/services/frames.services';

// frame controls
import { createOrderNumber } from './items/order-number-control';
import { createMoveControl } from './items/move-control';
import { createDeleteControl } from './items/delete-control';
import { createDuplicateControl } from './items/duplicate-control';

import { createFramePreview } from './items/frame-preview';

function makeFrameActive(frameId: string) {
  setActiveFrameId(frameId);
}

function createTopControlsLine(frameOrderNumber: number, framesCount: number, frameId: string) {
  const topControlsLine = document.createElement('div');
  topControlsLine.classList.add('frame-controls-line');

  const orderNumberControl = createOrderNumber(frameOrderNumber);
  const deleteControl = createDeleteControl(framesCount > 1, frameId);
  topControlsLine.append(orderNumberControl, deleteControl);

  return topControlsLine;
}

function createBottomControlsLine(framesCount: number, frameId: string) {
  const bottomControlsLine = document.createElement('div');
  bottomControlsLine.classList.add('frame-controls-line');

  const moveControl = createMoveControl(framesCount > 1);
  const duplicateControl = createDuplicateControl(frameId);
  bottomControlsLine.append(moveControl, duplicateControl);

  return bottomControlsLine;
}

interface IFrameElementProps {
  frame: CFrame;
  activeFrameId: string;
  orderNumber: number;
  framesCount: number;
}

export default ({
  frame,
  activeFrameId,
  orderNumber,
  framesCount,
}: IFrameElementProps): HTMLElement => {
  const frameItem = document.createElement('li');
  frameItem.id = `frame-${frame.id}`;
  frameItem.classList.add('frame');
  if (frame.id === activeFrameId) {
    frameItem.classList.add('frame--active');
  }

  const topControlsLine = createTopControlsLine(orderNumber, framesCount, frame.id);
  const previewItem = createFramePreview(frame.id, frame.canvasImage);
  const bottomControlsLine = createBottomControlsLine(framesCount, frame.id);
  frameItem.append(topControlsLine, previewItem, bottomControlsLine);

  frameItem.addEventListener('click', () => makeFrameActive(frame.id));

  return frameItem;
};
