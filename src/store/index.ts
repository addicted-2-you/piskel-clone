import { EStateTypes } from './EStateTypes';

import { IStoreSubscriber } from '~/models/IStoreSubscriber';

// init states
import { animationInitState } from './init-states/animation.init-state';
import { canvasInitState } from './init-states/canvas.init-state';
import { framesInitState } from './init-states/frames.init-state';
import { toolbarInitState } from './init-states/toolbar.init-state';

const states = new Map();
states.set(EStateTypes.ANIMATION_STATE, animationInitState);
states.set(EStateTypes.CANVAS_STATE, canvasInitState);
states.set(EStateTypes.FRAMES_STATE, framesInitState);
states.set(EStateTypes.TOOLBAR_STATE, toolbarInitState);

const stateSubscribersMap = new Map<EStateTypes, IStoreSubscriber[]>();

export default {
  notifySubscribers(stateName: EStateTypes): void {
    const subscribers = stateSubscribersMap.get(stateName);
    if (subscribers) {
      subscribers.forEach((subscriber) =>
        subscriber.listener(
          subscriber.stateTypes.reduce(
            (acc, stateType) => ({ ...acc, [stateType]: states.get(stateType) }),
            {},
          ),
        ),
      );
    }
  },

  mutate(stateName: EStateTypes, mutation: object): void {
    const state = states.get(stateName);
    if (state) {
      states.set(stateName, { ...state, ...mutation });
      this.notifySubscribers(stateName);
    }
  },

  subscribe(stateTypes: EStateTypes[], immediateCall: boolean, listener: any): void {
    stateTypes.forEach((stateType) => {
      const subscribers = stateSubscribersMap.get(stateType);
      if (subscribers) {
        subscribers.push({ stateTypes, listener });
      } else {
        stateSubscribersMap.set(stateType, [{ stateTypes, listener }]);
      }
    });

    if (immediateCall) {
      listener(
        stateTypes.reduce((acc, stateType) => ({ ...acc, [stateType]: states.get(stateType) }), {}),
      );
    }
  },

  getState(stateName: EStateTypes) {
    return states.get(stateName);
  },
};
