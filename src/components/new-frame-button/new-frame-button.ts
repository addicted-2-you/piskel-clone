import { addFrame } from '~/services/frames.services';

export default (): HTMLElement => {
  const newFrameButton = document.createElement('button');
  newFrameButton.classList.add('new-frame-button');

  const buttonIcon = document.createElement('span');
  buttonIcon.classList.add('new-frame-button--icon');

  const buttonText = document.createElement('span');
  buttonText.classList.add('new-frame-button--text');
  buttonText.textContent = 'Add new frame';

  newFrameButton.addEventListener('click', addFrame);

  newFrameButton.append(buttonIcon, buttonText);
  return newFrameButton;
};
