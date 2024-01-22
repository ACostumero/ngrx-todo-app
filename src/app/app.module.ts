import { APP_INITIALIZER, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { LayoutComponent } from './layout/containers/layout/layout.component';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { initAppDataFactory } from '@app-core/factories/init-app-data.factory';
import { StorageService } from '@app-core/services/storage.service';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(),
    EffectsModule.forRoot(),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    StoreRouterConnectingModule.forRoot()
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initAppDataFactory,
      deps: [StorageService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
