import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {NgxsModule} from '@ngxs/store';
import {CounterNgxsComponent} from './07-counter.component';
import {CounterState} from './state/ngxs-counter.state';

@NgModule({
  imports: [
    NgxsModule.forFeature([CounterState]),
    CommonModule
  ],
  declarations: [
    CounterNgxsComponent,
  ],
  exports: [
    CounterNgxsComponent,
  ],
  providers: []
})
export class CounterNgxsModule {
}
