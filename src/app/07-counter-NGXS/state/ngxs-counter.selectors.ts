import {Injectable} from '@angular/core';
import {Selector} from '@ngxs/store';
import {CounterState} from './ngxs-counter.state';
import {CounterStateModel} from './ngxs-counter.state-model';

@Injectable()
export class CounterSelectors {

  @Selector([CounterState])
  static counter(counterStateModel: CounterStateModel) {
    return counterStateModel.counter;
  }

}
