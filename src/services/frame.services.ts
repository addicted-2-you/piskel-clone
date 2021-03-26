import store from '~/store';
import { EStateTypes } from '~/store/EStateTypes';

import { CFrame } from '~/models/CFrame';

import { createDrawingCanvas } from './drawing-canvas.services';

let framesCount = 0;

/**
 *
 * Creates instance of the CFrame
 *
 * @param id
 * @returns created frame
 */
export function createFrame(id?: string): CFrame {
  framesCount += 1;

  const newFrameId = id || `${framesCount}`;
  return new CFrame({ id: newFrameId, layers: [createDrawingCanvas(newFrameId)] });
}

/**
 *
 * Creates a frame and integrates it to the app
 *
 * @returns added frame
 */
export function addFrame(): CFrame {
  const newFrame = createFrame();
  const { frames } = store.getState(EStateTypes.FRAMES_STATE);
  store.mutate(EStateTypes.FRAMES_STATE, {
    activeFrameId: newFrame.id,
    frames: [...frames, newFrame],
  });

  return newFrame;
}

export function getFrames(): CFrame[] {
  return store.getState(EStateTypes.FRAMES_STATE).frames;
}

export function getFrame(frameId: string): CFrame {
  const frames = getFrames();
  return frames.find((frame: CFrame) => frame.id === frameId) as CFrame;
}

export function getActiveFrame(): CFrame {
  const { activeFrameId, frames } = store.getState(EStateTypes.FRAMES_STATE);
  return frames.find((frame: CFrame) => frame.id === activeFrameId);
}

export function setActiveFrameId(activeFrameId: string): void {
  store.mutate(EStateTypes.FRAMES_STATE, { activeFrameId });
}

export function setFrameCanvasImage(frameId: string, canvasImage: string): void {
  const frame = getFrame(frameId);
  frame.canvasImage = canvasImage;
  store.mutate(EStateTypes.FRAMES_STATE, {});
}
