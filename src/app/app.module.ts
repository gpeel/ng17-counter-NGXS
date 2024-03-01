import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';
import {NgxsModule} from '@ngxs/store';
import {CounterNgxsModule} from './07-counter-NGXS/counter-ngxs.module';

import {AppComponent} from './app.component';

// 'isDevMode' cannot be determined statically, as it is an external declaration.
// const dev = isDevMode();
const dev = true;

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    // NGXS setup
    NgxsModule.forRoot([], {
      developmentMode: dev,
      selectorOptions: {
        suppressErrors: false,
        injectContainerState: false
      }
    }),
    !dev ? [] :
      [
        NgxsReduxDevtoolsPluginModule.forRoot({maxAge: 25}),
        NgxsLoggerPluginModule.forRoot({collapsed: true})
      ],

    // NGXS Counter Module
    CounterNgxsModule
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
