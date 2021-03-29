import './index.scss';

import { configureGlobalEventHandling } from './event-handling';

// views
import renderToolbar from './views/toolbar';
import renderFramesList from './views/frames-list';
import renderDrawingArea from './views/drawing-area';
import renderAnimationPreview from './views/animation-preview';

// build ui
renderToolbar();
renderFramesList();
renderDrawingArea();
renderAnimationPreview();

// configure global event handling
configureGlobalEventHandling();
