import { CFrame } from '~/models/CFrame';

let framesCount = 0;

export function createFrame(id?: string): CFrame {
  framesCount += 1;
  return new CFrame(id || `frame-${framesCount}`);
}
