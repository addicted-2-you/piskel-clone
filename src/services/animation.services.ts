import store from '~/store';
import { EStateTypes } from '~/store/EStateTypes';

export function setFps(fps: number): void {
  store.mutate(EStateTypes.ANIMATION_STATE, { fps });
}
