import { createControl } from './control';

export function createDeleteControl(isVisible: boolean): HTMLElement {
  const deleteControl = createControl({ isVisible, type: 'delete' });
  return deleteControl;
}
