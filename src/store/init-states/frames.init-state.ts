import { createFrame } from '~/services/frame.services';

export const framesInitState = {
  activeFrameId: 'first-frame',
  frames: [createFrame('first-frame')],
};
