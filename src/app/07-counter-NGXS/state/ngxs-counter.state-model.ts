export interface CounterStateModel {
  counter: number;
  // name?: string; // with ? you can forget to define the property
  name: string | undefined; // with |undefined you HAVE to defined to undefined,
  // and it is DIFFERENT, hasOwnProperty is now true
}

export const INITIAL_COUNTERFM_STATE_MODEL: CounterStateModel = {
  counter: 0,
  name: undefined,
};




