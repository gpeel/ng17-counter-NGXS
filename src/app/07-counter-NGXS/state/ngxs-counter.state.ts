import {Injectable} from '@angular/core';
import {Action, State, StateContext} from '@ngxs/store';
import {patch} from '@ngxs/store/operators';
// hardcoded , not IDE intellisensed
import * as a from './ngxs-counter.actions'; // a for Actions
import {CounterStateModel, INITIAL_COUNTERFM_STATE_MODEL} from './ngxs-counter.state-model';

@State<CounterStateModel>({
  name: 'counterFm',
  defaults: INITIAL_COUNTERFM_STATE_MODEL
})
@Injectable()
export class CounterState {

  @Action(a.SetAction)
  setCounterValue(ctx: StateContext<CounterStateModel>, action: a.SetAction) {
    console.log('ACTION!!!! SET', action);
    ctx.setState({...ctx.getState(), counter: action.counterValue});
  }

  @Action(a.IncremenAction)
  increment(ctx: StateContext<CounterStateModel>, action: a.IncremenAction) {
    console.log('ACTION!!!! INCREMENT', action);
    ctx.setState(patch({counter: ctx.getState().counter + 1}));
  }

  @Action(a.DecremenAction)
  decrement(ctx: StateContext<CounterStateModel>, action: a.DecremenAction) {
    console.log('ACTION!!!! DECREMENT', action);
    ctx.setState(patch({counter: ctx.getState().counter - 1}));
  }

}
