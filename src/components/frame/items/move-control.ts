import { getShifts, insertAfter } from '~/utils/dom.utils';
import { createControl } from './control';

import { createFrameDropzone } from './frame-dropzone';

const frameDropzoneElement = createFrameDropzone();

function getFrameNewTop(event: MouseEvent, shiftY: number) {
  return `${event.pageY - shiftY}px`;
}

function updateNextFrameElement(nextFrameElement: HTMLElement) {
  if (nextFrameElement?.nextSibling?.classList?.contains('dropzone')) {
    return nextFrameElement?.nextSibling?.nextSibling;
  }

  return nextFrameElement.nextSibling;
}

function updatePrevFrameElement(prevFrameElement: HTMLElement) {
  if (prevFrameElement?.previousSibling?.classList.contains('dropzone')) {
    return prevFrameElement?.previousSibling?.previousSibling;
  }

  return prevFrameElement.previousSibling;
}

function insertDropZoneAfter(frame: HTMLElement) {
  return insertAfter(frameDropzoneElement, frame);
}

function insertDropZoneBefore(frame: HTMLElement) {
  return frame?.parentNode?.insertBefore(frameDropzoneElement, frame);
}

function insertBeforeDropzone(frame: HTMLElement) {
  return frameDropzoneElement?.parentNode?.insertBefore(frame, frameDropzoneElement);
}

function onDragStart(event: MouseEvent): void {
  event.stopPropagation();

  let wasMoved = false;

  // eslint-disable-next-line prefer-destructuring
  const target = event.target as HTMLElement;
  const framesListElement = target.closest('.frames-list') as HTMLElement;
  const frameElement = target.closest('.frame') as HTMLElement;
  frameElement.style.position = 'absolute';
  frameElement.style.zIndex = '3';

  let nextFrame = frameElement.nextSibling;
  let prevFrame = frameElement.previousSibling;

  const { shiftY } = getShifts(frameElement, event);

  frameElement.after(frameDropzoneElement);

  function onDrag(): void {
    frameElement.style.top = getFrameNewTop(event, shiftY);

    if (
      nextFrame &&
      frameElement.offsetTop + frameElement.offsetHeight >
        nextFrame.offsetTop + nextFrame.offsetHeight * 0.6
    ) {
      wasMoved = true;

      frameDropzoneElement.remove();
      insertDropZoneAfter(nextFrame);

      prevFrame = nextFrame;
      nextFrame = updateNextFrameElement(nextFrame);
    } else if (
      prevFrame &&
      frameElement.offsetTop < prevFrame.offsetTop + prevFrame.offsetHeight * 0.4
    ) {
      wasMoved = true;

      frameDropzoneElement.remove();
      insertDropZoneBefore(prevFrame);

      nextFrame = prevFrame;
      prevFrame = updatePrevFrameElement(prevFrame);
    }
  }

  function onDragStop(event: MouseEvent): void {
    event.stopPropagation();

    frameDropzoneElement.remove();
  }

  moveControl.addEventListener('mouseup', onDragStop);
}

export function createMoveControl(isVisible: boolean): HTMLElement {
  const moveControl = createControl({ isVisible, type: 'move' });
  return moveControl;
}
