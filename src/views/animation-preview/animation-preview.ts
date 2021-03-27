import store from '~/store';
import { EStateTypes } from '~/store/EStateTypes';

export default (): void => {
  const animationPreviewContainer = document.getElementById(
    'animation-preview-container',
  ) as HTMLElement;

  const animationPreview = document.createElement('div');
  animationPreview.classList.add('animation-preview');

  let intervalId = -1;

  store.subscribe(EStateTypes.FRAMES_STATE, true, ({ frames }) => {
    animationPreviewContainer.innerHTML = '';

    let frameIndex = 0;
    clearInterval(intervalId);
    intervalId = window.setInterval(() => {
      animationPreview.style.backgroundImage = frames[frameIndex].canvasImage;

      frameIndex += 1;
      if (frameIndex >= frames.length) {
        frameIndex = 0;
      }
    }, 1000 / 5);

    animationPreviewContainer.appendChild(animationPreview);
  });
};
