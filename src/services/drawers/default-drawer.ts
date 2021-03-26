import { CPixel } from '~/models/CPixel';
import { IDrawer } from '~/models/tools/IDrawer';

export const defaultDrawer: IDrawer = {
  draw(hoveredPixel: CPixel): CPixel[] {
    return [hoveredPixel];
  },

  drawCtrl(...args) {
    return this.draw(...args);
  },

  drawShift(...args) {
    return this.draw(...args);
  },
};
