/**
 *
 * Gets pixel under the cursor.
 *
 * @param {DOMRect} canvasBoundingClientRect
 * @param {number} pixelSize
 * @param {number} clientX
 * @param {number} clientY
 * @returns
 */
export function getPixel(canvasBoundingClientRect, pixelSize, clientX, clientY) {
  return {
    xCoord: Math.floor((clientX - canvasBoundingClientRect.left) / pixelSize),
    yCoord: Math.floor((clientY - canvasBoundingClientRect.top) / pixelSize),
  };
}

/**
 *
 * Puts pixel on the canvas.
 *
 * @param {HTMLCanvasElement} canvas
 * @param {number} xCoord
 * @param {number} yCoord
 * @param {number} pixelSize
 * @param {string} color
 */
export function drawPixel(canvas, xCoord, yCoord, pixelSize, color = '#000000') {
  const context = canvas.getContext('2d');
  context.fillStyle = color;
  context.fillRect(xCoord * pixelSize, yCoord * pixelSize, pixelSize, pixelSize);
}
