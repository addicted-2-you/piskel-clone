export function createFramePreview(frameId: string, canvasImage: string): HTMLElement {
  const previewItem = document.createElement('div');
  previewItem.id = `${frameId}-preview`;
  previewItem.classList.add('preview');
  previewItem.style.backgroundImage = canvasImage;
  return previewItem;
}
