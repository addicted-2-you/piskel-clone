interface IControlProps {
  isVisible: boolean;
  type?: string;
}

export function createControl({ isVisible, type }: IControlProps): HTMLElement {
  const control = document.createElement('span');
  control.classList.add('frame-controls-line__control');

  if (isVisible) {
    control.classList.add(`frame-controls-line__control--${type}`);
    control.classList.add('frame-controls-line__control--transparent');
  } else {
    control.classList.add('frame-controls-line__control--hidden');
  }

  return control;
}
