import { deleteFrame } from '~/services/frames.services';

import { createControl } from './control';

function onDeleteFrame(event: MouseEvent, frameId: string) {
  event.stopPropagation();
  deleteFrame(frameId);
}

export function createDeleteControl(isVisible: boolean, frameId: string): HTMLElement {
  const deleteControl = createControl({ isVisible, type: 'delete' });
  deleteControl.addEventListener('click', (event) => onDeleteFrame(event, frameId));
  return deleteControl;
}
