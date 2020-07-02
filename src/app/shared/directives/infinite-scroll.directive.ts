import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import {
  Directive,
  HostListener,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { Subject } from 'rxjs';

@Directive({
  selector: '[appInfiniteScroll]',
})
export class InfiniteScrollDirective {
  @Output() bottomReached: EventEmitter<any> = new EventEmitter();
  @Input() infiniteScrollDebounce = 300;
  debounceSubject: Subject<any> = new Subject<any>();

  constructor() {}

  /**
   * event listener for scroll DOM Event
   *
   * @param {*} event
   */
  @HostListener('scroll', ['$event'])
  scrolling(event: any) {
    if (
      event.srcElement.offsetHeight + event.srcElement.scrollTop >=
      event.srcElement.scrollHeight
    ) {
      this.scrollReachedBottom(event.srcElement.scrollHeight);
    }
  }

  /**
   * will emit only once per position
   *
   * @param {number} maxPosition
   */
  scrollReachedBottom(maxPosition: number) {
    if (this.debounceSubject.observers.length === 0) {
      this.debounceSubject
        .pipe(debounceTime(this.infiniteScrollDebounce), distinctUntilChanged())
        .subscribe(() => {
          this.bottomReached.emit(true);
        });
    }
    this.debounceSubject.next(maxPosition);
  }
}
