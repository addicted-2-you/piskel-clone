import { PEN } from '~constants/tool-names';

import * as stateTypes from './state-types';

export default [
  [
    stateTypes.CANVAS_STATE,
    {
      canvasHeight: 32,
      canvasWidth: 32,
      pixelSize: 20,
    },
  ],
  [
    stateTypes.TOOLBAR_STATE,
    {
      activeTool: PEN,
    },
  ],
];
