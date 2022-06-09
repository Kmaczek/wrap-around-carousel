import { style, animate, animation, keyframes } from '@angular/animations';

export const moveMidToLeft = animation([
  animate('0.2s ease-out', style({ transform: 'translateX(-80vw)' })),
]);

export const moveMidToRight = animation([
  animate('0.2s ease-out', style({ transform: 'translateX(80vw)' })),
]);

export const moveLeftToMid = animation([
  animate('0.2s ease-out', style({ transform: 'translateX(0)' })),
]);

export const moveLeftOut = animation([
  animate('0.2s ease-out', style({ transform: 'translateX(-100vw)' })),
]);

export const moveRightToMid = animation([
  animate('0.2s ease-out', style({ transform: 'translateX(0)' })),
]);

export const moveRightOut = animation([
  animate('0.2s ease-out', style({ transform: 'translateX(100vw)' })),
]);
