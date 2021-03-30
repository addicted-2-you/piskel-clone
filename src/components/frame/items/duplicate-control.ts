import { cloneFrame } from '~/services/frames.services';

import { createControl } from './control';

function onDuplicateFrame(event: MouseEvent, frameId: string) {
  event.stopPropagation();
  cloneFrame(frameId);
}

export function createDuplicateControl(frameId: string): HTMLElement {
  const duplicateControl = createControl({ isVisible: true, type: 'duplicate' });
  duplicateControl.addEventListener('click', (event) => onDuplicateFrame(event, frameId));
  return duplicateControl;
}
