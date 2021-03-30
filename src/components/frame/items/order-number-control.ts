import { createControl } from './control';

export function createOrderNumber(orderNumber: number): HTMLElement {
  const orderNumberControl = createControl({ isVisible: true, type: 'order' });
  orderNumberControl.textContent = `${orderNumber}`;
  orderNumberControl.classList.remove('frame-controls-line__control--transparent');
  return orderNumberControl;
}
