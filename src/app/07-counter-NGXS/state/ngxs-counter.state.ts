import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {patch} from '@ngxs/store/operators';

export class IncremenAction {
  static readonly type = '[Counter] increment';
}

export class DecremenAction {
  static readonly type = '[Counter] decrement';
}

export interface CounterStateModel {
  counter: number;
  name: string | undefined;
}

@State<CounterStateModel>({
  name: 'counterFm',
  defaults: {counter: 0, name: undefined}
})
@Injectable()
export class CounterState {

  @Selector([CounterState])
  static counter(counterStateModel: CounterStateModel) {
    return counterStateModel.counter;
  }

  @Action(IncremenAction)
  increment(ctx: StateContext<CounterStateModel>, action: IncremenAction) {
    console.log('ACTION!!!! INCREMENT', action);
    ctx.setState(patch({counter: ctx.getState().counter + 1}));
  }

  @Action(DecremenAction)
  decrement(ctx: StateContext<CounterStateModel>, action: DecremenAction) {
    console.log('ACTION!!!! DECREMENT', action);
    ctx.setState(patch({counter: ctx.getState().counter - 1}));
  }

}
