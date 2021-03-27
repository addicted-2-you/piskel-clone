import { EStateTypes } from '~/store/EStateTypes';

export interface IStoreSubscriber {
  stateTypes: EStateTypes[];
  listener(): any;
}
