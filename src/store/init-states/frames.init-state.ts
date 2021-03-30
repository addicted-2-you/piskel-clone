import { createFrame } from '~/services/frames.services';

export const framesInitState = {
  frames: [createFrame('1')],
  activeFrameId: '1',
};
