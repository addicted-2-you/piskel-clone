import store from '~/store';
import { EStateTypes } from '~/store/EStateTypes';

import { CFrame } from '~/models/CFrame';

import createFrameElement from '~/components/frame';
import createNewFrameButton from '~/components/new-frame-button';

export default (): void => {
  const toolbarContainer = document.getElementById('toolbar-container');
  const framesContainer = document.getElementById('frames-conrainer') as HTMLElement;

  const framesList = document.createElement('ul');
  framesList.classList.add('frames-list');

  const newFrameButton = createNewFrameButton();

  framesContainer.append(framesList, newFrameButton);
  toolbarContainer?.appendChild(framesContainer);

  store.subscribe(
    [EStateTypes.FRAMES_STATE],
    true,
    ({ [EStateTypes.FRAMES_STATE]: { activeFrameId, frames } }) => {
      framesList.innerHTML = '';

      const frameItems = frames.map((frame: CFrame, index: number) =>
        createFrameElement({
          frame,
          activeFrameId,
          orderNumber: index + 1,
          framesCount: frames.length,
        }),
      );

      framesList.append(...frameItems);
      framesContainer?.replaceChild(framesList, framesList);
    },
  );
};
