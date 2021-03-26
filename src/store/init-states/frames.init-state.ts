import { createFrame } from '~/services/create-frame';

export const framesInitState = {
  activeFrameId: 'first-frame',
  frames: [createFrame('first-frame')],
};
