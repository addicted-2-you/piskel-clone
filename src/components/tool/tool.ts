import store from '~/store';
import { EStateTypes } from '~/store/EStateTypes';

import { ETools } from '~/models/tools/EToolNames';

const toolClassMap = {
  [ETools.PEN]: 'tool--pen',
  [ETools.MIRROR_PEN]: 'tool--mirror-pen',
};

export default (toolName: ETools, isActive: boolean) => {
  const tool = document.createElement('button');
  const toolClass = toolClassMap[toolName];
  if (toolClass) {
    tool.classList.add(toolClass);
  }

  if (isActive) {
    tool.classList.add('tool--active');
  }

  tool.classList.add('tool');

  tool.addEventListener('click', () => {
    store.mutate(EStateTypes.TOOLBAR_STATE, { activeTool: toolName });
  });

  return tool;
};
