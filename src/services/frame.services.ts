import store from '~/store';
import { EStateTypes } from '~/store/EStateTypes';

import { CFrame } from '~/models/CFrame';

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
  return new CFrame(id || `frame-${framesCount}`);
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

export function setActiveFrame(activeFrameId: string): void {
  store.mutate(EStateTypes.FRAMES_STATE, { activeFrameId });
}
