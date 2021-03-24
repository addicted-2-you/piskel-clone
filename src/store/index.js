import initStates from './init-states';

const states = new Map(initStates);
const stateSubscribersMap = new Map();

export default {
  notifySubscribers(stateName) {
    const subscribers = stateSubscribersMap.get(stateName);
    if (subscribers) {
      subscribers.forEach((subscriber) => subscriber(this.getState(stateName)));
    }
  },

  mutate(stateName, mutation) {
    const state = states.get(stateName);
    if (state) {
      states.set(stateName, { ...state, ...mutation });
      this.notifySubscribers(stateName);
    }
  },

  subscribe(stateName, immediateCall, subscriber) {
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

  getState(stateName) {
    return states.get(stateName);
  },
};
