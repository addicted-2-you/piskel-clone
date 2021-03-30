import { createControl } from './control';

export function createDuplicateControl(): HTMLElement {
  const duplicateControl = createControl({ isVisible: true, type: 'duplicate' });
  return duplicateControl;
}
