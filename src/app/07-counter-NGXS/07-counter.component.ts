import {Component} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
// hardcoded , not IDE intellisensed
import * as a from './state/ngxs-counter.actions'; // a for Actions
import {CounterSelectors} from './state/ngxs-counter.selectors';

@Component({
  selector: 'ngxs-counter',
  template: `
    <div class="spread">
      <button (click)="decrement()" name="-">-</button>
      <span data-testid="count">Current Count: {{ counter$ | async }}</span>
      <button (click)="increment()" name="+">+</button>
    </div>
  `,
})
export class CounterNgxsComponent {

  // CQRS : command Query segregation responsibility
  // counter = 0;
  @Select(CounterSelectors.counter) counter$!: Observable<number>;

  constructor(private store: Store) {}

  increment() {
    // this.counter += 1;
    this.store.dispatch(new a.IncremenAction());
  }

  decrement() {
    // this.counter -= 1;
    this.store.dispatch(new a.DecremenAction());
  }
}
