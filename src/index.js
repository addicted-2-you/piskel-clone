import './index.scss';

import renderDrawingArea from './renderers/drawing-area';

function renderHeader() {}

function renderToolBar() {}

function renderSettingsBar() {}

function renderFooter() {}

function renderApp() {
  renderHeader();

  renderToolBar();
  renderDrawingArea();
  renderSettingsBar();

  renderFooter();
}

renderApp();
