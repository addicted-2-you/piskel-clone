import { createFrame } from '~/services/frame.services';

export const framesInitState = {
  activeFrameId: '1',
  frames: [createFrame('1')],
};
