import { EStateTypes } from './EStateTypes';

// init states
import { canvasInitState } from './init-states/canvas.init-state';
import { framesInitState } from './init-states/frames.init-state';
import { toolbarInitState } from './init-states/toolbar.init-state';

const states = new Map();
states.set(EStateTypes.CANVAS_STATE, canvasInitState);
states.set(EStateTypes.FRAMES_STATE, framesInitState);
states.set(EStateTypes.TOOLBAR_STATE, toolbarInitState);

const stateSubscribersMap = new Map();

export default {
  notifySubscribers(stateName: EStateTypes): void {
    const subscribers = stateSubscribersMap.get(stateName);
    if (subscribers) {
      subscribers.forEach((subscriber) => subscriber(this.getState(stateName)));
    }
  },

  mutate(stateName: EStateTypes, mutation: object): void {
    const state = states.get(stateName);
    if (state) {
      states.set(stateName, { ...state, ...mutation });
      this.notifySubscribers(stateName);
    }
  },

  subscribe(stateName: EStateTypes, immediateCall: boolean, subscriber: Function): void {
    const subscribers = stateSubscribersMap.get(stateName);
    if (subscribers) {
      subscribers.push(subscriber);
    } else {
      stateSubscribersMap.set(stateName, [subscriber]);
    }

    if (immediateCall) {
      subscriber(this.getState(stateName));
    }
  },

  getState(stateName: EStateTypes) {
    return states.get(stateName);
  },
};
