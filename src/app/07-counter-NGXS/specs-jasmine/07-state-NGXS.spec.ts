// does not work for VC /// <reference types="@types/jasmine" />

import {ComponentFixture, fakeAsync, getTestBed, TestBed, tick, waitForAsync} from '@angular/core/testing';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';
import {NgxsModule, Store} from '@ngxs/store';
import {CounterNgxsComponent} from '../07-counter.component';

// HAND CODING import
import * as A from '../state/ngxs-counter.actions'; // A for Actions
import {CounterState} from '../state/ngxs-counter.state';

/**
 * We are testing the NGXS State and its ACIONS
 *
 *  The Store is a dependency of CounterNgxsComponent
 *
 *  constructor(private store: Store) {}
 *
 *  So we must provide a Store oo Mock of a Store
 * https://www.ngxs.io/recipes/unit-testing
 */

describe('NGXS Store ', () => {
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // declarations: [CounterNgxsComponent],// no need for @Components, we test NGXS State and ACtions
      imports: [
        NgxsModule.forRoot([], {
          developmentMode: true,
          selectorOptions: {suppressErrors: false, injectContainerState: false}
        }),
        NgxsModule.forFeature([CounterState]),
        NgxsLoggerPluginModule.forRoot({collapsed: false})
      ]
    }).compileComponents();
    //
    store = TestBed.inject(Store);
  });

  it('1) should create', () => {
    expect(store).toBeTruthy();
  });

  it('2) should initialize with counter=0', async () => {
    console.log('STORE-0', store.snapshot());
    const counter = store.selectSnapshot(state => state.counterFm.counter);
    expect(counter).toBe(0);
  });

  it('3) should inc counter when dispatching ngxs-counter.actions.IncremenAction() ', async () => {
    let counter = store.selectSnapshot(state => state.counterFm.counter);
    store.dispatch(new A.IncremenAction());
    counter = store.selectSnapshot(state => state.counterFm.counter);
    expect(counter).toBe(1);
  });

  it('4) should dec counter when dispatching ngxs-counter.actions.DecremenAction using ASYNC !', async () => {
    let counter = store.selectSnapshot(state => state.counterFm.counter);
    store.dispatch(new A.DecremenAction());
    counter = store.selectSnapshot(state => state.counterFm.counter);
    expect(counter).toBe(-1);
  });

  it('5) should dec counter when dispatching ngxs-counter.actions.DecremenAction using ASYNC !', async () => {
    const counter$ = store.select(state => state.counterFm.counter);
    let counter!: number;
    counter$.subscribe(c => {
      counter = c;
      console.log('CHANGING', c);
      // setTimeout(() => {
      //   counter = c;
      //   console.log('CHANGING', c);
      // });
    });
    expect(counter).toBe(0);
    store.dispatch(new A.DecremenAction());
    // why no need for whenStable ? subscibing is chained in sync
    // With setTimeout => now needs whenStable
    console.log('COUNTER -1 ?', counter);
    expect(counter).toBe(-1);
  });

  it('6) should dec counter when dispatching ngxs-counter.actions.DecremenAction using ASYNC !', fakeAsync(async () => {
    const counter$ = store.select(state => state.counterFm.counter);
    let counter!: number;
    counter$.subscribe(c => {
      setTimeout(() => {
        counter = c;
        console.log('CHANGING', c);
      });
    });
    store.dispatch(new A.DecremenAction());

    tick();
    console.log('COUNTER -1 ?', counter);
    expect(counter).toBe(-1);
  }));

});

describe('NGXS Store (with fixture access) ', () => {
  let store: Store;
  // eslint-disable-next-line
  let fixture!: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CounterNgxsComponent],// adde only only to get access to a fixture
      imports: [
        NgxsModule.forRoot([], {
          developmentMode: true,
          selectorOptions: {suppressErrors: false, injectContainerState: false}
        }),
        NgxsModule.forFeature([CounterState]),
        NgxsLoggerPluginModule.forRoot({collapsed: false})
      ]
    }).compileComponents();
    //
    fixture = TestBed.createComponent(CounterNgxsComponent);
    store = TestBed.inject(Store);
  });

  it('7) should dec counter when dispatching ngxs-counter.actions.DecremenAction using ASYNC !', waitForAsync(async () => {
    const counter$ = store.select(state => state.counterFm.counter);
    let counter!: number;
    counter$.subscribe(c => {
      setTimeout(() => {
        counter = c;
        console.log('CHANGING', c);
      });
    });
    // expect(counter).toBe(0); // not yet here
    // With setTimeout => now needs whenStable
    await fixture.whenStable();
    expect(counter).toBe(0); // now ok

    // ACT
    store.dispatch(new A.DecremenAction());

    // With setTimeout => now needs whenStable
    await fixture.whenStable();
    console.log('COUNTER -1 ?', counter);
    expect(counter).toBe(-1);
  }));

});

// eslint-disable-next-line
function getFixture() {
  const fixtures: Array<ComponentFixture<any>> = (getTestBed() as any)._activeFixtures;
  return fixtures[fixtures.length - 1];
}
