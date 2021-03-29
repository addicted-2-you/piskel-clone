import store from '~/store';
import { EStateTypes } from '~/store/EStateTypes';

function getPixelSize(): number {
  return store.getState(EStateTypes.CANVAS_STATE).pixelSize;
}

function incrementPixelSize(): void {
  const pixelSize = getPixelSize();
  if (pixelSize < 30) {
    store.mutate(EStateTypes.CANVAS_STATE, { pixelSize: pixelSize + 1 });
  }
}

function decrementPixelSize(): void {
  const pixelSize = getPixelSize();
  if (pixelSize > 10) {
    store.mutate(EStateTypes.CANVAS_STATE, { pixelSize: pixelSize - 1 });
  }
}

function configureGlobalKeyboardEventHandling(): void {
  // TODO: add global keyboard event listeners
}

function configureGlobalMouseEventHandling(): void {
  document.addEventListener('wheel', (event) => {
    // event.preventDefault();

    if (event.deltaY < 0) {
      incrementPixelSize();
    } else {
      decrementPixelSize();
    }
  });
}

export function configureGlobalEventHandling(): void {
  configureGlobalKeyboardEventHandling();
  configureGlobalMouseEventHandling();
}
