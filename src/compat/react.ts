import { Vekio } from '../runtime/index.js';

/** React compatibility helper for migration */
export const ReactCompat = {
  createElement: Vekio.createElement,
  Fragment: Vekio.Fragment,
  memo: Vekio.memo,
  startTransition: Vekio.startTransition
};

export const createElement = Vekio.createElement;
export const Fragment = Vekio.Fragment;
