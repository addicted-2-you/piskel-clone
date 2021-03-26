import { CFrame } from '~/models/CFrame';
import { setActiveFrame } from '~/services/frame.services';

function makeFrameActive(frameId: string) {
  setActiveFrame(frameId);
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

  frameItem.addEventListener('click', () => makeFrameActive(frame.id));

  frameItem.appendChild(previewItem);
  return frameItem;
};
