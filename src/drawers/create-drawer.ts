import { ETools } from '~/models/tools/EToolNames';
import { IDrawer } from '~/models/tools/IDrawer';

// drawers
import { defaultDrawer } from './default-drawer';
import { mirrorDrawer } from './mirror-drawer';

export function createDrawer(tool: ETools): IDrawer {
  switch (tool) {
    case ETools.MIRROR_PEN: {
      return mirrorDrawer;
    }
    default: {
      return defaultDrawer;
    }
  }
}
