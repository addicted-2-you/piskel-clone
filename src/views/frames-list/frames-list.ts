import store from '~/store';
import { EStateTypes } from '~/store/EStateTypes';

import { CFrame } from '~/models/CFrame';

import renderFrame from '~/components/frame';

export default () => {
  const toolbarContainer = document.getElementById('toolbar-container');

  const framesList = document.createElement('ul');
  framesList.classList.add('frames-container');

  store.subscribe(EStateTypes.FRAMES_STATE, true, ({ activeFrameId, frames }) => {
    framesList.innerHTML = '';
    framesList.remove();

    const frameItems = frames.map((frame: CFrame) => renderFrame(frame, activeFrameId));
    framesList.append(...frameItems);

    toolbarContainer?.appendChild(framesList);
  });
};
