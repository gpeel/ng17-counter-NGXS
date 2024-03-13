import {Component} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {CounterState, IncremenAction} from './state/ngxs-counter.state';

@Component({
  selector: 'ngxs-counter',
  template: `
    <div class="spread">
      <span data-testid="count">Current Count: {{ counter$ | async }}</span>
      <button (click)="increment()" name="+">+</button>
    </div>
  `,
})
export class CounterNgxsComponent {

  @Select(CounterState.counter) counter$!: Observable<number>;

  constructor(private store: Store) {}

  increment() {
    this.store.dispatch(new IncremenAction());
  }

}
