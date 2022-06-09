import {
  animate,
  state,
  style,
  transition,
  trigger,
  useAnimation,
} from '@angular/animations';
import { ChangeDetectorRef, Component, OnInit, Renderer2 } from '@angular/core';
import { moveLeftOut, moveLeftToMid, moveMidToLeft, moveMidToRight, moveRightOut, moveRightToMid } from './app.animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('moveMid', [
      transition('* => left', [useAnimation(moveMidToLeft)]),
      transition('* => right', [useAnimation(moveMidToRight)]),
    ]),
    trigger('moveLeft', [
      transition('* => left', [useAnimation(moveLeftOut)]),
      transition('* => right', [useAnimation(moveLeftToMid)]),
    ]),
    trigger('moveRight', [
      transition('* => left', [useAnimation(moveRightToMid)]),
      transition('* => right', [useAnimation(moveRightOut)]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  isOpen = true;
  position: 'left' | 'mid' | 'right' = 'mid'

  items = ['one', 'two', 'three']

  constructor(private cdRef: ChangeDetectorRef, private renderer: Renderer2) {

  }

  ngOnInit(): void {
    
  }

  setDisplayedItems() {

  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  toggleMove() {
    this.position = this.position === 'left' ? 'right' : 'left';
  }

  moveRight() {
    this.position = 'right';
  }

  moveLeft() {
    this.position = 'left';
  }

  onAnimationEvent(ev:any, el: HTMLElement) {
    //this.renderer.setStyle(el, 'order', this.position === 'left' ? '0' : '2');
    //el.style.order = '1';
    //this.cdRef.detectChanges();
    this.position = 'mid';
    console.log(ev);
  }
}
