export function getCoords(element: HTMLElement) {
  const box = element.getBoundingClientRect();
  return {
    top: box.top + window.pageYOffset,
    left: box.left + window.pageXOffset,
  };
}

export function getShifts(element: HTMLElement, event: MouseEvent) {
  const coords = getCoords(element);
  const shiftX = event.pageX - coords.left;
  const shiftY = event.pageY - coords.top;
  return { shiftX, shiftY };
}

export function insertAfter(element: HTMLElement, refElement: HTMLElement) {
  return refElement?.parentNode?.insertBefore(element, refElement.nextSibling);
}
