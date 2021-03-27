import { setFps } from '~/services/animation.services';

export default (): HTMLElement => {
  const fpsPicker = document.createElement('input');
  fpsPicker.type = 'range';
  fpsPicker.min = '1';
  fpsPicker.max = '24';
  fpsPicker.value = '12';
  fpsPicker.addEventListener('input', () => setFps(Number(fpsPicker.value)));
  return fpsPicker;
};
