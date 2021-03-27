import store from '~/store';
import { EStateTypes } from '~/store/EStateTypes';

import createFpsPicker from '~/components/fps-picker';

export default (): void => {
  const animationPreviewContainer = document.getElementById(
    'animation-preview-container',
  ) as HTMLElement;

  const animationPreview = document.createElement('div');
  animationPreview.classList.add('animation-preview');

  const animationPreviewControls = document.createElement('div');
  animationPreviewControls.classList.add('animation-preview-controls');
  animationPreviewControls.appendChild(createFpsPicker());

  let intervalId = -1;

  store.subscribe(
    [EStateTypes.FRAMES_STATE, EStateTypes.ANIMATION_STATE],
    true,
    ({ [EStateTypes.FRAMES_STATE]: { frames }, [EStateTypes.ANIMATION_STATE]: { fps } }) => {
      animationPreviewContainer.innerHTML = '';

      let frameIndex = 0;
      clearInterval(intervalId);
      intervalId = window.setInterval(() => {
        animationPreview.style.backgroundImage = frames[frameIndex].canvasImage;

        frameIndex += 1;
        if (frameIndex >= frames.length) {
          frameIndex = 0;
        }
      }, 1000 / fps);

      animationPreviewContainer.appendChild(animationPreview);
      animationPreviewContainer.appendChild(animationPreviewControls);
    },
  );
};
