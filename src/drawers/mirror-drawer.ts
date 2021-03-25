import { CPixel } from '~/models/CPixel';
import { IDrawer } from '~/models/tools/IDrawer';

import { defaultDrawer } from './default-drawer';

export const mirrorDrawer: IDrawer = {
  ...defaultDrawer,

  draw(hoveredPixel: CPixel, canvasHeight: number, canvasWidth: number): CPixel[] {
    return [
      hoveredPixel,
      {
        ...hoveredPixel,
        xCoord: canvasWidth - hoveredPixel.xCoord,
        yCoord: canvasHeight - hoveredPixel.yCoord,
      },
    ];
  },
};
