import { CFrame } from '~/models/CFrame';

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

  frameItem.appendChild(previewItem);

  return frameItem;
};
