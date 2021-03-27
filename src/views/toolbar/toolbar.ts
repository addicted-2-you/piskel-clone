import store from '~/store';
import { EStateTypes } from '~/store/EStateTypes';

import { ETools } from '~/models/tools/EToolNames';

import createTool from '~/components/tool';

export default (): void => {
  const toolbarContainer = document.getElementById('toolbar-container');
  const toolbar = document.getElementById('toolbar') as HTMLElement;

  store.subscribe(
    [EStateTypes.TOOLBAR_STATE],
    true,
    ({ [EStateTypes.TOOLBAR_STATE]: { activeTool } }) => {
      toolbar.innerHTML = '';

      toolbar?.append(
        createTool(ETools.PEN, activeTool === ETools.PEN),
        createTool(ETools.MIRROR_PEN, activeTool === ETools.MIRROR_PEN),
      );

      toolbarContainer?.appendChild(toolbar);
    },
  );
};
