import {
  animate,
  AnimationBuilder,
  AnimationFactory,
  AnimationPlayer,
  state,
  style,
  transition,
  trigger,
  useAnimation,
} from '@angular/animations';
import { ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { Subject } from 'rxjs';
import { moveLeftOut, moveLeftToMid, moveMidToLeft, moveMidToRight, moveRightOut, moveRightToMid } from './app.animations';
import { CarouselModel } from './app.models';

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
  @ViewChildren('itemsRef', { read: ElementRef }) carouselElements: QueryList<ElementRef>;

  items: CarouselModel[] = []

  timing = '400ms ease-out';
  animationsDone$ = new Subject<string>();
  animations: AnimationPlayer[] = []

  constructor(private cdRef: ChangeDetectorRef, private renderer: Renderer2, private builder : AnimationBuilder) {

  }

  ngOnInit(): void {
    this.items.push(new CarouselModel({title: 'one', color: 'crimson'}));
    this.items.push(new CarouselModel({title: 'two', color: 'chartreuse'}));
    this.items.push(new CarouselModel({title: 'three', color: 'burlywood'}));
    this.items.push(new CarouselModel({title: 'four', color: 'cornflowerblue'}));
    // this.items.push(new CarouselModel({title: 'five', color: 'darkorange'}));

    const item = this.items.pop();
    this.items.unshift(item);

    this.animationsDone$.subscribe(x => {
      if (x == 'right') {
        const item = this.items.pop();
        this.items.unshift(item);

        this.items = [...this.items];
      }
      this.animations.forEach(x => x.destroy());
      
    })
  }

  private buildAnimation( offset: number ) {
    return this.builder.build([
      animate(this.timing, style({ transform: `translate3d(${offset}vw, 0px, 0px)` }))
    ]);
  }

  animateToRight() {
    this.animations = [];
    const elements = this.carouselElements.toArray();
    let fired = 0;
    const animationCount = 4;

    const midAnimation : AnimationFactory = this.buildAnimation(80);
    const midPlayer = midAnimation.create(elements[1].nativeElement);
    this.animations.push(midPlayer);
    midPlayer.onDone((): void => {
      fired++;
      if(fired === animationCount) {
        this.animationsDone$.next('right');
      }
    });

    const leftAnimation : AnimationFactory = this.buildAnimation(0);
    const leftPlayer = leftAnimation.create(elements[0].nativeElement);
    this.animations.push(leftPlayer);
    leftPlayer.onDone((): void => {
      fired++;
      if(fired === animationCount) {
        this.animationsDone$.next('right');
      }
    });

    const rightAnimation : AnimationFactory = this.buildAnimation(160);
    const rightPlayer = rightAnimation.create(elements[2].nativeElement);
    this.animations.push(rightPlayer);
    rightPlayer.onDone((): void => {
      fired++;
      if(fired === animationCount) {
        this.animationsDone$.next('right');
      }
    });

    const outLeftAnimation : AnimationFactory = this.buildAnimation(-80);
    const outLeftPlayer = outLeftAnimation.create(elements[elements.length-1].nativeElement);
    this.animations.push(outLeftPlayer);
    outLeftPlayer.onDone((): void => {
      fired++;
      if(fired === animationCount) {
        this.animationsDone$.next('right');
      }
    });

    this.animations.forEach(a => a.play());
  }

  moveRight() {
    this.animateToRight();
  }

  moveLeft() {
    this.position = 'left';
  }
}
