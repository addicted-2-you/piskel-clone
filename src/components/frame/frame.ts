import { CFrame } from '~/models/CFrame';
import { setActiveFrameId } from '~/services/frame.services';

function makeFrameActive(frameId: string) {
  setActiveFrameId(frameId);
}

export default (frame: CFrame, activeFrameId: string): HTMLElement => {
  const frameItem = document.createElement('li');
  frameItem.id = frame.id;
  frameItem.classList.add('frame');
  if (frame.id === activeFrameId) {
    frameItem.classList.add('frame--active');
  }

  const previewItem = document.createElement('div');
  previewItem.id = `${frame.id}-preview`;
  previewItem.classList.add('preview');
  previewItem.style.backgroundImage = frame.canvasImage;

  frameItem.addEventListener('click', () => makeFrameActive(frame.id));

  frameItem.appendChild(previewItem);
  return frameItem;
};
