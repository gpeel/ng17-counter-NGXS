/**
 * to get nice clean code in the CrudState class,
 * import manually this file with:
 * import * as a from './counter.actions';
 * See counter.state.ts for an example
 */

// n for NAMES ... used ONLY locally in this file, no export needed
enum n {
  INCREMENT_COUNTER = '[Counter] increment',
  DECREMENT_COUNTER = '[Counter] decrement',
  SET_COUNTER = '[Counter] set',
}

// @formatter:off

export class IncremenAction {
  static readonly type = n.INCREMENT_COUNTER;
}

export class DecremenAction {
  static readonly type = n.DECREMENT_COUNTER;
}

export class SetAction {
  static readonly type = n.SET_COUNTER;
  constructor(public counterValue : number) {}
}
