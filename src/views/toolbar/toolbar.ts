import store from '~/store';
import { EStateTypes } from '~/store/EStateTypes';

import { ETools } from '~/models/tools/EToolNames';

import createTool from '~/components/tool';

export default () => {
  const toolbar = document.createElement('ul');
  toolbar.classList.add('toolbar');

  const toolbarContainer = document.getElementById('toolbar-container');

  store.subscribe(EStateTypes.TOOLBAR_STATE, true, ({ activeTool }) => {
    toolbar.innerHTML = '';
    toolbar.remove();

    toolbar.append(
      createTool(ETools.PEN, activeTool === ETools.PEN),
      createTool(ETools.MIRROR_PEN, activeTool === ETools.MIRROR_PEN),
    );

    toolbarContainer?.appendChild(toolbar);
  });
};
